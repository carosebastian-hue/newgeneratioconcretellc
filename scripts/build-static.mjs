// Builds a static copy of the site for shared hosting (cPanel / public_html).
// Usage: npm run build:static  ->  upload the contents of ./sitio-estatico
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";

const OUT = "sitio-estatico";
const env = { ...process.env, STATIC_EXPORT: "1", NITRO_PRESET: "node-server" };

const result = spawnSync("npx", ["vite", "build"], { stdio: "inherit", env, shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

const built = ".output/public";
const pages = [`${built}/index.html`, `${built}/trabaja-con-nosotros/index.html`];
const missing = pages.filter((p) => !existsSync(p));
if (missing.length) {
  console.error(`\nNo se generaron estas páginas: ${missing.join(", ")}`);
  console.error("Copia el mensaje completo de arriba y envíaselo a Claude.");
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
cpSync(built, OUT, { recursive: true });
rmSync(`${OUT}/_headers`, { force: true }); // Cloudflare-only file

writeFileSync(
  `${OUT}/.htaccess`,
  `Options -Indexes
DirectoryIndex index.html

AddType video/mp4 .mp4

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
`,
);

console.log(`\nListo. Sube TODO el contenido de la carpeta "${OUT}" a public_html.`);
