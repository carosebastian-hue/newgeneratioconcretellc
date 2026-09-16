# Plan: Descargar el código del sitio

## Objetivo
Entregar el código fuente completo de este sitio (856 New Generation Concrete LLC) como un archivo ZIP descargable.

## Pasos
1. Ensamblar en una carpeta temporal solo lo necesario: `src/`, `public/`, `index.html` (si existe), y los archivos de configuración (package.json, vite.config.ts, tsconfig.json, eslint, prettier, components.json, bunfig.toml, README.md, AGENTS.md, robots).
2. Excluir lo que no corresponde: dependencias instaladas (node_modules), metadatos de Git, salida de builds generados y archivos internos de la plataforma.
3. Verificar el listado completo de la carpeta (incluyendo archivos ocultos) antes de empaquetar.
4. Crear el ZIP en una carpeta temporal, inspeccionar sus entradas y copiarlo a la sección de archivos con un nombre claro, p. ej. `856-new-generation-concrete-src.zip`.

## Resultado
- Un ZIP descargable con todo el código fuente del sitio, listo para abrir en tu computadora o subir a GitHub.
