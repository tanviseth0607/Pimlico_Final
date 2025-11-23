import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);

      // Return middleware to handle SPA routing in dev mode
      return () => {
        // Add SPA fallback - serve index.html for non-API routes
        server.middlewares.use((req, res, next) => {
          // Skip API routes
          if (req.url.startsWith("/api")) {
            return next();
          }

          // Skip static files and already handled files
          if (
            req.url.match(/\.(js|css|json|ico|svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)(\?.*)?$/)
          ) {
            return next();
          }

          // For all other routes, let Vite serve index.html
          req.url = "/";
          next();
        });
      };
    },
  };
}
