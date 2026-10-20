// Builds a static copy of the site for shared hosting (cPanel / public_html).
// Usage: npm run build:static  ->  upload the contents of ./sitio-estatico
import { spawnSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, rmSync, writeFileSync } from "node:fs";

// Start from a clean slate so no output from an earlier build is reused.
for (const dir of ["dist", ".output"]) rmSync(dir, { recursive: true, force: true });

const OUT = "sitio-estatico";
const env = { ...process.env, STATIC_EXPORT: "1" };

const result = spawnSync("npx", ["vite", "build"], { stdio: "inherit", env, shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

// Client output: dist/client without nitro (.output/public kept as a fallback).
const built = ["dist/client", ".output/public"].find((d) => existsSync(d)) ?? "dist/client";
const shell = ["_shell.html", "_shell/index.html", "index.html"]
  .map((f) => `${built}/${f}`)
  .find((f) => existsSync(f));
if (!shell) {
  console.error("\nNo se generó la página base del sitio (_shell.html).");
  console.error("Copia el mensaje completo de arriba y envíaselo a Claude.");
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
cpSync(built, OUT, { recursive: true });
copyFileSync(shell.replace(built, OUT), `${OUT}/index.html`);
rmSync(`${OUT}/_headers`, { force: true }); // Cloudflare-only file

// Apache: serve real files as-is; send every page route (e.g. /trabaja-con-nosotros)
// to index.html so the app renders it in the browser.
writeFileSync(
  `${OUT}/.htaccess`,
  `Options -Indexes
DirectoryIndex index.html

AddType video/mp4 .mp4

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

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
