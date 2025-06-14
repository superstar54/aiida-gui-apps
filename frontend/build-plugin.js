const esbuild = require("esbuild");
const path = require("path");

const mode = process.argv[2] || "build";

const entry = path.resolve(__dirname, "src/index.js");
const outfile = path.resolve(__dirname, "../aiida_gui_apps/static/apps.esm.js");

const commonOptions = {
  logLevel: "info",
  entryPoints: [entry],
  bundle: true,
  format: "esm",
  platform: "browser",
  outfile,
  sourcemap: false,
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
  },
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  external: [
    "react",
    "react-dom",
    "react-dom/client",
    "react/jsx-runtime",
    "react-router-dom",
    "use-sync-external-store",
    "use-sync-external-store/shim",
  ],
  banner: {
    js: `
      var require = function(name) {
        if (name === 'react') return window.React;
        if (name === 'react-dom') return window.ReactDOM;
        if (name === 'react-dom/client') return window.ReactDOM;
        if (name === 'react/jsx-runtime') return window.React;
        if (name === 'use-sync-external-store' || name === 'use-sync-external-store/shim')
          return { useSyncExternalStore: window.React.useSyncExternalStore };
        throw new Error('Cannot require "' + name + '"');
      };
    `,
  },
};

if (mode === "watch") {
  esbuild.context(commonOptions)
    .then(ctx => ctx.watch())
    .then(() => console.log("[esbuild] Watching for changes..."))
    .catch(err => {
      console.error("[esbuild] Watch error:", err);
      process.exit(1);
    });
} else {
  esbuild.build(commonOptions)
    .then(() => console.log("[esbuild] Build complete."))
    .catch(err => {
      console.error("[esbuild] Build failed:", err);
      process.exit(1);
    });
}
