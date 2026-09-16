# Plan: Enlace de Facebook en el icono

## Situación actual
El enlace ya está guardado en el sitio (`src/lib/i18n.tsx`, constante `SOCIAL.facebook`) exactamente como el usuario lo pidió:
`https://www.facebook.com/profile.php?id=61574906236067&mibextid=wwXIfr`
El icono de Facebook del header usa esa constante, así que no se requiere cambio de código.

## Pasos
1. Verificar con el navegador de pruebas que el icono de Facebook en la cabecera apunta a esa URL exacta y que Facebook responde correctamente (la página "856 New Generation Concrete" abre).
2. Si por alguna razón el enlace difiere o falla, corregirlo y volver a verificar.

## Nota
El usuario reportó antes que el link "no funcionaba": la URL es válida y Facebook la responde. Los motivos más comunes son el bloqueo de ventanas emergentes dentro del panel de vista previa o que Facebook pida iniciar sesión; el enlace funciona al abrir el sitio publicado.
