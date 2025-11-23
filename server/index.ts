import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Serve static files and SPA fallback (only in production)
  const spaDir = path.join(__dirname, "../dist/spa");
  if (fs.existsSync(spaDir)) {
    app.use(express.static(spaDir));
    // SPA fallback - serve index.html for all non-API routes
    app.use((_req, res) => {
      res.sendFile(path.join(spaDir, "index.html"));
    });
  }

  return app;
}
