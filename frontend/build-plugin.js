
const esbuild = require("esbuild");
const path    = require("path");

const entry   = path.resolve(__dirname, "src/index.js");
const outfile = path.resolve(__dirname, "../aiida_gui_apps/static/apps.esm.js");

esbuild.build({
  entryPoints:   [entry],
  bundle:        true,
  format:        "esm",
  platform:      "browser",
  outfile,
  sourcemap:     false,
  loader: {
    ".js":  "jsx",
    ".jsx": "jsx",
  },
  jsxFactory:   "React.createElement",
  jsxFragment:  "React.Fragment",
  external: [
    "react",
    "react-dom",
    "react-dom/client",
    "react/jsx-runtime",
    "react-router-dom",
    "use-sync-external-store",
    "use-sync-external-store/shim",
  ],

  // <<< Add this banner to shim `require` calls >>> 
  banner: {
    js: `
      // Shim Node.js-style require for our externals in the browser:
      var require = function(name) {
        if (name === 'react')                 return window.React;
        if (name === 'react-dom')             return window.ReactDOM;
        if (name === 'react-dom/client')      return window.ReactDOM;
        if (name === 'react/jsx-runtime')     return window.React;         // jsx-runtime is also React
        if (name === 'use-sync-external-store' 
            || name === 'use-sync-external-store/shim') 
                                              return { useSyncExternalStore: window.React.useSyncExternalStore };
        // add more cases here if you externalize other CJS libs…
        throw new Error('Cannot require \"' + name + '\"');  
      };
    `
  },
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});
