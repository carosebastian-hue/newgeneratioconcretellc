# Formulario con envío directo por correo

Hoy el formulario abre el cliente de correo del visitante (mailto). El objetivo es que el visitante pulse "Enviar solicitud" y el correo llegue a 856newgenerationconcrete@gmail.com sin abrir nada.

## Paso 1 — Dominio de correo (acción del usuario, pendiente)
- Enviar correos requiere un dominio propio del negocio (ej. notify@tudominio.com). El usuario lo configura con el botón "Configurar dominio de correo" mostrado en el chat. Estado actual: aún no configurado.
- Si el usuario no tiene dominio, indicarle cómo comprar uno (Project Settings → Domains, o cualquier registrador).

## Paso 2 — Sistema de plantillas de correo
- Ejecutar el scaffold de plantillas transaccionales (registry + helper de envío server-side + ruta de preview).
- Verificar paquetes: `@lovable.dev/email-js@0.1.0`, `@lovable.dev/webhooks-js`, `@react-email/components`, `@react-email/render`.

## Paso 3 — Plantilla "solicitud de estimado"
- Nueva plantilla React Email `quote-request` en `src/lib/email-templates/` con los datos del formulario: nombre, teléfono, email, servicio, plazo y detalles.
- Estilo acorde a la marca (ámbar industrial sobre blanco, tipografía limpia), texto en inglés (el destinatario es el negocio).

## Paso 4 — Ruta de envío server-side
- Ruta de servidor dedicada (pública) que valide los campos (zod), aplique rate-limit básico, y envíe la plantilla a 856newgenerationconcrete@gmail.com con `sendTemplateEmail` e `idempotencyKey`.
- Nunca aceptar destinatario ni plantilla arbitrarios desde el navegador.

## Paso 5 — Actualizar el formulario
- Reemplazar el mailto en `QuoteForm.tsx` por un fetch a la ruta de envío.
- Estados de UI: enviando, éxito y error, con textos EN/ES nuevos en `src/lib/i18n.tsx`.
- Conservar la nota con teléfono como alternativa.

## Notas técnicas
- Los correos empiezan a enviarse cuando el dominio queda verificado (Cloud → Emails muestra el estado).
- Cada correo lleva pie de baja gestionado por Lovable (obligatorio, no removible).
- Publicar la app para que el envío funcione en producción.
