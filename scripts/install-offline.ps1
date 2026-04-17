param(
  [string]$DbName = "control_stock",
  [string]$DbUser = "postgres",
  [string]$DbPassword = "postgres",
  [int]$DbPort = 5432,
  [int]$AppPort = 3002,
  [string]$PostgresMajor = "16",
  [switch]$SkipSeed
)

$ErrorActionPreference = "Stop"

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Get-CommandPath([string]$Name) {
  $cmd = Get-Command $Name -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Path }
  return $null
}

function Ensure-NodeInstalled {
  $nodePath = Get-CommandPath "node"
  if ($nodePath) {
    Write-Host "Node.js detectado: $nodePath" -ForegroundColor DarkGreen
    return
  }

  $installer = Get-ChildItem -Path $AssetsPath -Filter "node-*-x64.msi" -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $installer) {
    throw "No se encontro instalador de Node.js en $AssetsPath (node-*-x64.msi)."
  }

  Write-Step "Instalando Node.js en modo silencioso"
  Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$($installer.FullName)`" /qn /norestart" -Wait -NoNewWindow

  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
  $nodePath = Get-CommandPath "node"
  if (-not $nodePath) {
    throw "Node.js no quedo disponible en PATH luego de la instalacion."
  }
}

function Ensure-PostgresInstalled {
  $pgService = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($pgService) {
    Write-Host "PostgreSQL detectado: $($pgService.Name)" -ForegroundColor DarkGreen
    return
  }

  $installer = Get-ChildItem -Path $AssetsPath -Filter "postgresql-*-windows-x64.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $installer) {
    throw "No se encontro instalador de PostgreSQL en $AssetsPath (postgresql-*-windows-x64.exe)."
  }

  Write-Step "Instalando PostgreSQL en modo silencioso"
  $args = @(
    "--mode", "unattended",
    "--unattendedmodeui", "none",
    "--superpassword", $DbPassword,
    "--serverport", "$DbPort",
    "--servicename", "postgresql-x64-$PostgresMajor"
  )
  Start-Process -FilePath $installer.FullName -ArgumentList $args -Wait -NoNewWindow

  Start-Sleep -Seconds 5
}

function Resolve-PsqlPath {
  $psql = Get-CommandPath "psql"
  if ($psql) { return $psql }

  $candidate = "C:\Program Files\PostgreSQL\$PostgresMajor\bin\psql.exe"
  if (Test-Path $candidate) { return $candidate }

  $fallback = Get-ChildItem -Path "C:\Program Files\PostgreSQL" -Filter "psql.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($fallback) { return $fallback.FullName }

  throw "No se pudo ubicar psql.exe."
}

function Ensure-Database([string]$psqlPath) {
  $env:PGPASSWORD = $DbPassword

  Write-Step "Verificando conexion a PostgreSQL"
  & $psqlPath -h "localhost" -p $DbPort -U $DbUser -d "postgres" -c "SELECT 1;" | Out-Null

  Write-Step "Creando base de datos si no existe"
  $exists = (& $psqlPath -h "localhost" -p $DbPort -U $DbUser -d "postgres" -tAc "SELECT 1 FROM pg_database WHERE datname = '$DbName';").Trim()
  if ($exists -ne "1") {
    & $psqlPath -h "localhost" -p $DbPort -U $DbUser -d "postgres" -c "CREATE DATABASE $DbName;"
  } else {
    Write-Host "La base '$DbName' ya existe." -ForegroundColor DarkGreen
  }
}

function Write-EnvFile {
  Write-Step "Escribiendo .env.production"
  $encodedPassword = [System.Uri]::EscapeDataString($DbPassword)
  $databaseUrl = "postgresql://$DbUser:$encodedPassword@localhost:$DbPort/$DbName?schema=public"
  $envPath = Join-Path $AppRoot ".env.production"

  @"
DATABASE_URL="$databaseUrl"
PORT=$AppPort
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
"@ | Set-Content -Path $envPath -Encoding UTF8
}

function Run-PrismaAndSeed {
  Write-Step "Aplicando migraciones Prisma"
  Push-Location $AppRoot
  try {
    npx.cmd prisma migrate deploy
    if (-not $SkipSeed) {
      Write-Step "Ejecutando seed inicial"
      npm.cmd run prisma:seed
    }
  } finally {
    Pop-Location
  }
}

function Start-App {
  Write-Step "Iniciando aplicacion"
  $logsPath = Join-Path $AppRoot "logs"
  if (-not (Test-Path $logsPath)) {
    New-Item -ItemType Directory -Path $logsPath | Out-Null
  }

  $logFile = Join-Path $logsPath "app.log"
  $startCommand = "Set-Location '$AppRoot'; `$env:NODE_ENV='production'; `$env:PORT='$AppPort'; npm.cmd run start *>> '$logFile'"
  Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $startCommand -WindowStyle Hidden
}

$AppRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$AssetsPath = Join-Path $AppRoot "offline-assets"

Write-Step "Instalacion offline de Control Stock"
Write-Host "AppRoot: $AppRoot"

if (-not (Test-Path $AssetsPath)) {
  throw "No existe carpeta de instaladores offline: $AssetsPath"
}

Ensure-NodeInstalled
Ensure-PostgresInstalled
$psqlPath = Resolve-PsqlPath
Ensure-Database -psqlPath $psqlPath
Write-EnvFile
Run-PrismaAndSeed
Start-App

Write-Host ""
Write-Host "Instalacion finalizada. App disponible en: http://localhost:$AppPort" -ForegroundColor Green
Write-Host "Log de la app: $AppRoot\logs\app.log" -ForegroundColor Green
