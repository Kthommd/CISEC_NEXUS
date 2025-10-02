import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c0e686a6/health", (c) => {
  return c.json({ status: "ok" });
});

const startServer = async () => {
  const deno = (globalThis as {
    Deno?: { serve?: (handler: (request: Request) => Response | Promise<Response>) => void };
  }).Deno;

  if (deno?.serve) {
    deno.serve(app.fetch);
    return;
  }

  const { serve } = await import("@hono/node-server");
  const portFromProcess =
    typeof process !== "undefined" && process.env?.PORT ? Number(process.env.PORT) : undefined;
  const port = Number.isFinite(portFromProcess) ? Number(portFromProcess) : 3000;
  serve({ fetch: app.fetch, port });
  console.log(`Server listening on port ${port}`);
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
});

export default app;
export const fetch = app.fetch;
