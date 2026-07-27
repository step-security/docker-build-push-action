import * as esbuild from 'esbuild';

// When esbuild bundles ESM→CJS, it sets `import_meta = {}` for each module,
// causing createRequire(import.meta.url) to throw (url is undefined).
// We patch by injecting a shim that populates import.meta.url with the
// CJS-equivalent file URL before any module code runs.
await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'cjs',
  outfile: 'dist/index.cjs',
  sourcemap: true,
  minify: true,
  keepNames: true,
  define: {
    'import.meta.url': '__importMetaUrl'
  },
  banner: {
    js: `const {pathToFileURL} = require('url'); const __importMetaUrl = pathToFileURL(__filename).href;`
  }
});
