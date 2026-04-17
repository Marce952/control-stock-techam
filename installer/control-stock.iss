#define MyAppName "Control Stock Techam"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Techam"
#define MyAppURL "http://localhost:3002"
#define MyAppExeName "powershell.exe"

[Setup]
AppId={{B0E9F4DD-3C2C-4F6C-A26F-1CFA2F31F876}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\Control Stock Techam
DisableProgramGroupPage=yes
PrivilegesRequired=admin
OutputDir=..\dist\installer
OutputBaseFilename=control-stock-setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Files]
Source: "..\dist\offline-package\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Run]
Filename: "{#MyAppExeName}"; \
  Parameters: "-NoProfile -ExecutionPolicy Bypass -File ""{app}\scripts\install-offline.ps1"" -DbName ""control_stock"" -DbUser ""postgres"" -DbPassword ""postgres"" -DbPort 5432 -AppPort 3002"; \
  StatusMsg: "Configurando base de datos y aplicacion. Esto puede demorar varios minutos..."; \
  Flags: runhidden waituntilterminated

[Icons]
Name: "{autodesktop}\Control Stock (Abrir en navegador)"; Filename: "{cmd}"; Parameters: "/c start http://localhost:3002"
Name: "{group}\Control Stock (Abrir en navegador)"; Filename: "{cmd}"; Parameters: "/c start http://localhost:3002"
