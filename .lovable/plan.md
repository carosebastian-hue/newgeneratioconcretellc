# Plan: Video "Trabaja con nosotros" + nuevo hero con video generado

## Qué se va a hacer

1. **Página nueva "Trabaja con nosotros"** (`/trabaja-con-nosotros`)
   - Registra `Trabajos.mp4` (56 s, vertical) como asset CDN del sitio y lo muestra en un reproductor con controles, junto a un texto bilingüe invitando a trabajar con la compañía y botones de llamada / estimado.
   - Enlace "Trabaja con nosotros" / "Work with us" en el menú del header (escritorio y móvil).
   - Página con su propio título y metadatos, header/footer y selector EN/ES igual que el resto del sitio.

2. **Nuevo hero con video de presentación generado por mí**
   - Genero un video cinematográfico 16:9 (~6–8 s, en bucle, sin sonido) de trabajo de concreto profesional: vertido, llaneado, concreto estampado, toma aérea de entrada terminada.
   - Reemplazo el video actual (`presentacion.mp4`) del hero por el video generado, con la foto actual como póster de respaldo.
   - El video actual deja de usarse en el hero (queda solo en la página nueva, si aplica).

## Archivos que cambian

- `src/assets/trabajos.mp4.asset.json` — puntero del video subido (nuevo)
- `src/assets/hero-video.mp4.asset.json` — puntero del video generado (nuevo)
- `src/components/site/Hero.tsx` — usa el video generado
- `src/components/site/Header.tsx` — enlace a la página nueva
- `src/lib/i18n.tsx` — textos ES/EN de la página nueva y del enlace
- `src/routes/trabaja-con-nosotros.tsx` — página nueva (nuevo)
- `src/routes/index.tsx` — sin cambios de contenido

## Verificación

- Build sin errores.
- Playwright: el hero reproduce el video nuevo; la página `/trabaja-con-nosotros` carga, reproduce el video con sonido/controles y el menú lleva a ella.
