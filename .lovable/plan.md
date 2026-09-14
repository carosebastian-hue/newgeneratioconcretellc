# Plan: Ajustar iconos de redes sociales en el header

## Objetivo
Cambiar los colores de los iconos de redes sociales y centrarlos horizontalmente entre el logo/título (izquierda) y el menú de navegación (derecha).

## Cambios propuestos

1. **Colores de los iconos**
   - Aplicar el color corporativo de cada red social a su icono correspondiente:
     - Facebook: azul (#1877F2)
     - Instagram: rosa/magenta (#E1306C)
     - YouTube: rojo (#FF0000)
     - TikTok: blanco/negro según contraste (#FFFFFF)
   - Mantener el efecto hover como un leve aclarado o escala.

2. **Centrado entre título y menú**
   - Extraer los iconos de redes sociales del grupo del logo/título.
   - Colocarlos en una zona central del header, centrada horizontalmente entre el bloque del logo (izquierda) y el menú de navegación + controles (derecha).
   - Usar `absolute` positioning o `flex-1` con `justify-center` para mantener el layout estable en escritorio.
   - Los iconos seguirán ocultos en móvil para no saturar el header compacto.

3. **Archivo a modificar**
   - `src/components/site/Header.tsx`

## Nota
Si prefieres que todos los iconos usen un solo color (por ejemplo, el ámbar del sitio o blanco), indícamelo y ajustaré el plan antes de implementar.
