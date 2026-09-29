import { createServer } from "node:http";
import { createHash, timingSafeEqual } from "node:crypto";
import { hostHeaderValidation, NodeStreamableHTTPServerTransport } from "@modelcontextprotocol/node";
import { createToastServer } from "./toast.js";

const token = process.env.TOAST_API_TOKEN;
if (!token || token.length < 32 || /\s/.test(token)) {
  throw new Error("TOAST_API_TOKEN must contain at least 32 non-whitespace characters. Generate a random token; never commit it.");
}
const port = Number(process.env.PORT ?? "3000");
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
const host = process.env.HOST ?? "127.0.0.1";
const publicUrl = process.env.PUBLIC_URL ?? process.env.RENDER_EXTERNAL_URL;
let publicOrigin: string | undefined;
if (publicUrl) {
  const url = new URL(publicUrl);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("PUBLIC_URL must be an HTTPS origin, without a path, credentials, query or fragment.");
  }
  publicOrigin = url.origin;
}
if (host !== "127.0.0.1" && host !== "::1" && !publicOrigin) {
  throw new Error("PUBLIC_URL (or RENDER_EXTERNAL_URL) is required when listening beyond loopback.");
}
const validateHost = hostHeaderValidation(publicOrigin
  ? [new URL(publicOrigin).hostname]
  : ["localhost", "127.0.0.1", "[::1]"]);
const origins = new Set((process.env.ALLOWED_ORIGINS ?? "").split(",").map(x => x.trim()).filter(Boolean));
for (const origin of origins) {
  if (new URL(origin).origin !== origin) throw new Error("ALLOWED_ORIGINS must contain exact origins");
}
const digest = (value: string) => createHash("sha256").update(value).digest();
const expected = digest(`Bearer ${token}`);
let active = 0;
const http = createServer({ requestTimeout: 15000, headersTimeout: 10000, maxHeaderSize: 16384 }, async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (!validateHost(req, res)) return;
  if (req.headers.origin && !origins.has(req.headers.origin)) {
    res.writeHead(403).end("Origin not allowed"); return;
  }
  if (req.url === "/healthz" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" }).end('{"status":"ok"}'); return;
  }
  // Match the exact path: never accept credentials in URL parameters.
  if (req.url !== "/mcp") { res.writeHead(404).end("Not found"); return; }
  if (!timingSafeEqual(expected, digest(req.headers.authorization ?? ""))) {
    res.writeHead(401, { "WWW-Authenticate": 'Bearer realm="toast"' }).end("Unauthorized"); return;
  }
  if (req.method !== "POST") { res.writeHead(405, { Allow: "POST" }).end("Method not allowed"); return; }
  if (active >= 32) { res.writeHead(503, { "Retry-After": "1" }).end("Busy"); return; }
  active++;
  const mcpServer = await createToastServer();
  const transport = new NodeStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
    maxRequestBodySize: 65536
  });
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true; active--;
    void mcpServer.close().catch(() => {});
  };
  res.once("close", cleanup);
  res.setTimeout(15000, () => res.destroy());
  try {
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res);
  } catch {
    // Do not log request bodies, credentials or personal file contents.
    console.error("MCP request failed");
    if (!res.headersSent) res.writeHead(500).end("Internal server error");
    else res.destroy();
    cleanup();
  }
});
http.listen(port, host, () => console.error(`Toast HTTP listening on ${host}:${port}; endpoint /mcp`));
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    http.close(() => process.exit(0));
    setTimeout(() => { http.closeAllConnections(); process.exit(0); }, 5000).unref();
  });
}
