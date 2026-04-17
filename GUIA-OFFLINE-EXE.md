# Guia para generar instalador `.exe` offline

Esta guia crea un instalador de Windows que deja funcionando:

- Base de datos PostgreSQL
- App Next.js (frontend + backend API)
- Migraciones y seed de Prisma

## 1) Preparar archivos offline

En la raiz del proyecto crea esta carpeta:

`offline-assets/`

Y copia dentro:

- Instalador offline de Node.js x64 (ejemplo: `node-v22.14.0-x64.msi`)
- Instalador offline de PostgreSQL x64 (EDB) (ejemplo: `postgresql-16.8-1-windows-x64.exe`)

> Los nombres pueden variar, pero deben matchear estos patrones:
> - `node-*-x64.msi`
> - `postgresql-*-windows-x64.exe`

## 2) Construir paquete offline de la app

Desde la raiz del repo, ejecutar:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-offline.ps1
```

Esto genera:

- `dist/offline-package/` con app compilada, dependencias, scripts y assets offline.

## 3) Compilar el instalador con Inno Setup

1. Instalar Inno Setup en tu PC de armado.
2. Abrir `installer/control-stock.iss`.
3. Presionar **Build** (o `Compile`).

Resultado:

- `dist/installer/control-stock-setup.exe`

Ese es el archivo que llevas a la PC del cliente (sin internet).

## 4) Instalar en la PC cliente (sin internet)

1. Ejecutar `control-stock-setup.exe` como administrador.
2. Esperar la instalacion (puede tardar varios minutos por PostgreSQL).
3. Al finalizar, abrir:
   - [http://localhost:3002](http://localhost:3002)

## 5) Parametros importantes

El instalador ejecuta:

- `scripts/install-offline.ps1`

con estos valores por defecto:

- DB: `control_stock`
- Usuario DB: `postgres`
- Password DB: `postgres`
- Puerto DB: `5432`
- Puerto app: `3002`

Si queres cambiarlos, edita la seccion `[Run]` de `installer/control-stock.iss`.

## 6) Logs y troubleshooting

Log de la app en cliente:

- `C:\Program Files\Control Stock Techam\logs\app.log`

Si algo falla:

1. Verifica que el antivirus no bloquee instaladores silenciosos.
2. Verifica que `5432` y `3002` no esten ocupados.
3. Reintenta instalacion ejecutando setup como administrador.

## 7) Recomendaciones de produccion

- Cambiar password por defecto de PostgreSQL antes de distribuir.
- Definir backup automatico de la base.
- Opcional: agregar servicio Windows (NSSM) para auto-reinicio de la app.
