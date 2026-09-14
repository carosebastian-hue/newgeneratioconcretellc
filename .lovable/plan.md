# Plan: Poner "856" primero en el título del sitio

## Objetivo
Asegurar que el número "856" sea la primera palabra visible en el título del sitio y en las previsualizaciones sociales.

## Cambios propuestos
1. **Actualizar `src/routes/index.tsx`**
   - Cambiar el título de la página a `"856 NEW GENERATION CONCRETE LLC"` (sin sufijo posterior) para que "856" abra el título y se lea completo en la pestaña del navegador.
   - Mantener `og:title` con el mismo texto.

2. **Actualizar `src/routes/__root.tsx`**
   - Alinear el título por defecto y `og:title` con `"856 NEW GENERATION CONCRETE LLC"`.

3. **Verificación**
   - Revisar que la pestaña del navegador muestre "856 NEW GENERATION CONCRETE LLC" al inicio.

## Nota técnica
TanStack Start define el título dentro del arreglo `meta` de `head()`. Se actualizará tanto el título de la ruta "/" como el fallback del root para mantener consistencia.
