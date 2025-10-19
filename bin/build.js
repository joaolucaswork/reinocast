import * as esbuild from 'esbuild';
import { copyFileSync, readdirSync } from 'fs';
import { join, sep } from 'path';

// Config output
const BUILD_DIRECTORY = 'dist';
const PRODUCTION = process.env.NODE_ENV === 'production';

// Config entrypoint files
const ENTRY_POINTS = [
  'src/index.ts',
  'src/styles.css', // CSS separado para usar com <link> no Webflow
];

// Files to copy to dist
const STATIC_FILES = ['transcribe.srt'];

// Config dev serving
const LIVE_RELOAD = !PRODUCTION;
const SERVE_PORT = 3000;
const SERVE_ORIGIN = `http://localhost:${SERVE_PORT}`;

// Copy static files to dist
function copyStaticFiles() {
  STATIC_FILES.forEach((file) => {
    try {
      copyFileSync(file, join(BUILD_DIRECTORY, file));
      console.log(`✓ Copied ${file} to ${BUILD_DIRECTORY}`);
    } catch (error) {
      console.warn(`⚠ Could not copy ${file}:`, error.message);
    }
  });
}

// Create context
const context = await esbuild.context({
  bundle: true,
  entryPoints: ENTRY_POINTS,
  outdir: BUILD_DIRECTORY,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2020' : 'esnext',
  inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
  define: {
    SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
  },
});

// Copy static files initially (works for both dev and prod)
copyStaticFiles();

// Build files in prod
if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
}

// Watch and serve files in dev
else {
  await context.watch();

  // Watch static files for changes in dev mode
  if (!PRODUCTION) {
    const { watch } = await import('fs');
    STATIC_FILES.forEach((file) => {
      watch(file, (eventType) => {
        if (eventType === 'change') {
          console.log(`\n📝 ${file} changed, copying to ${BUILD_DIRECTORY}...`);
          copyStaticFiles();
        }
      });
    });
  }

  await context
    .serve({
      servedir: BUILD_DIRECTORY,
      port: SERVE_PORT,
    })
    .then(logServedFiles);
}

/**
 * Logs information about the files that are being served during local development.
 */
function logServedFiles() {
  /**
   * Recursively gets all files in a directory.
   * @param {string} dirPath
   * @returns {string[]} An array of file paths.
   */
  const getFiles = (dirPath) => {
    const files = readdirSync(dirPath, { withFileTypes: true }).map((dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory() ? getFiles(path) : path;
    });

    return files.flat();
  };

  const files = getFiles(BUILD_DIRECTORY);

  const filesInfo = files
    .map((file) => {
      if (file.endsWith('.map')) return;

      // Normalize path and create file location
      const paths = file.split(sep);
      paths[0] = SERVE_ORIGIN;

      const location = paths.join('/');

      // Create import suggestion
      const tag = location.endsWith('.css')
        ? `<link href="${location}" rel="stylesheet" type="text/css"/>`
        : `<script defer src="${location}"></script>`;

      return {
        'File Location': location,
        'Import Suggestion': tag,
      };
    })
    .filter(Boolean);

  // eslint-disable-next-line no-console
  console.table(filesInfo);
}
