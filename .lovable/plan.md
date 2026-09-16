# Plan: Corregir la apertura de Facebook

## Objetivo
Hacer que el icono abra la página de Facebook fuera del panel de vista previa, evitando el mensaje “Facebook rechazó la conexión”.

## Situación confirmada
- El icono ya contiene exactamente la dirección solicitada: `https://www.facebook.com/profile.php?id=61574906236067&mibextid=wwXIfr`.
- El enlace ya está configurado para una pestaña nueva, pero el panel puede intentar mostrar la navegación dentro de su propia ventana; Facebook bloquea ese tipo de visualización.

## Cambios
1. Mantener intacta la dirección exacta de Facebook.
2. Ajustar únicamente el comportamiento del icono de Facebook para abrir explícitamente una pestaña externa al hacer clic, tanto en computadora como en celular.
3. Mantener Instagram, YouTube y TikTok sin cambios.
4. Comprobar que el clic genera una página nueva con la URL correcta y que el sitio continúa compilando correctamente.