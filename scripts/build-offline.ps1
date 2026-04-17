param(
  [string]$OutputDir = "dist\offline-package"
)

$ErrorActionPreference = "Stop"

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$OutputPath = Join-Path $ProjectRoot $OutputDir
$AssetsPath = Join-Path $ProjectRoot "offline-assets"

Write-Step "Preparando carpeta de salida"
if (Test-Path $OutputPath) {
  Remove-Item -Recurse -Force $OutputPath
}
New-Item -ItemType Directory -Path $OutputPath | Out-Null

Write-Step "Verificando instaladores offline en offline-assets"
if (-not (Test-Path $AssetsPath)) {
  throw "No existe la carpeta '$AssetsPath'. Crea 'offline-assets' y copia los instaladores offline."
}

$NodeInstaller = Get-ChildItem -Path $AssetsPath -Filter "node-*-x64.msi" -ErrorAction SilentlyContinue | Select-Object -First 1
$PgInstaller = Get-ChildItem -Path $AssetsPath -Filter "postgresql-*-windows-x64.exe" -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $NodeInstaller) {
  throw "No se encontro instalador de Node.js. Esperado: offline-assets\node-*-x64.msi"
}

if (-not $PgInstaller) {
  throw "No se encontro instalador de PostgreSQL. Esperado: offline-assets\postgresql-*-windows-x64.exe"
}

Write-Step "Instalando dependencias y compilando Next.js"
Push-Location $ProjectRoot
npm.cmd ci
npm.cmd run build
Pop-Location

Write-Step "Copiando archivos de la app"
$filesToCopy = @(
  "package.json",
  "package-lock.json",
  "next.config.mjs"
)

foreach ($relativeFile in $filesToCopy) {
  $source = Join-Path $ProjectRoot $relativeFile
  if (Test-Path $source) {
    Copy-Item -Path $source -Destination $OutputPath -Force
  }
}

$dirsToCopy = @(
  ".next",
  "node_modules",
  "public",
  "prisma",
  "scripts",
  "offline-assets"
)

foreach ($relativeDir in $dirsToCopy) {
  $source = Join-Path $ProjectRoot $relativeDir
  if (Test-Path $source) {
    Copy-Item -Path $source -Destination $OutputPath -Recurse -Force
  }
}

Write-Step "Generando .env.production de referencia"
$envFile = Join-Path $OutputPath ".env.production"
@"
# Archivo generado por scripts/build-offline.ps1
# Se sobrescribe durante la instalacion con los valores finales.
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/control_stock?schema=public"
PORT=3002
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
"@ | Set-Content -Path $envFile -Encoding UTF8

Write-Step "Paquete offline listo"
Write-Host "Salida: $OutputPath" -ForegroundColor Green
Write-Host "Siguiente paso: compilar installer/control-stock.iss con Inno Setup." -ForegroundColor Green
