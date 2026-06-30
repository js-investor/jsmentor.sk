import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

const KONZULTACIA_S_IVANOM_PATH = "/konzultacia-s-ivanom";
const konzultaciaSIvanomHtmlPath = path.resolve(
  __dirname,
  "public/konzultacia-s-ivanom/index.html",
);

function serveKonzultaciaSIvanom(): Plugin {
  const handle = (
    req: { url?: string },
    res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
    next: () => void,
  ) => {
    const url = (req.url ?? "").split("?")[0];

    if (url === KONZULTACIA_S_IVANOM_PATH) {
      res.statusCode = 301;
      res.setHeader("Location", `${KONZULTACIA_S_IVANOM_PATH}/`);
      res.end();
      return;
    }

    if (url === `${KONZULTACIA_S_IVANOM_PATH}/`) {
      const html = fs.readFileSync(konzultaciaSIvanomHtmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(html);
      return;
    }

    next();
  };

  return {
    name: "serve-konzultacia-s-ivanom",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    // Keep SVG/logo assets as files (not data URIs) for production compatibility.
    assetsInlineLimit: 0,
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [serveKonzultaciaSIvanom(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
