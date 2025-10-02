import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store";
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

const deno = (globalThis as {
  Deno?: { serve?: (handler: (request: Request) => Response | Promise<Response>) => void };
}).Deno;

if (deno?.serve) {
  deno.serve(app.fetch);
}

export default app;
export const fetch = app.fetch;