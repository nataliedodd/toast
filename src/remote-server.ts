import { createServer } from "node:http";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/server";
import { createToastServer } from "./server.js";

const port = Number(process.env.PORT ?? 3000);
const requiredToken = process.env.TOAST_REMOTE_TOKEN;

const server = await createToastServer();
const transport = new WebStandardStreamableHTTPServerTransport({
  sessionIdGenerator: () => crypto.randomUUID(),
  enableJsonResponse: true
});

await server.connect(transport);

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing URL" }));
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", tokenRequired: Boolean(requiredToken) }));
    return;
  }

  if (url.pathname !== "/mcp") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  if (requiredToken) {
    const authorization = req.headers.authorization ?? "";
    if (authorization !== `Bearer ${requiredToken}`) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }
  }

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      headers.append(key, item);
    }
  }

  const requestInit: RequestInit = {
    method: req.method ?? "GET",
    headers
  };

  if (req.method === "POST" || req.method === "PUT") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    requestInit.body = Buffer.concat(chunks);
  }

  const request = new Request(url, requestInit);
  const response = await transport.handleRequest(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    const body = Buffer.from(await response.arrayBuffer());
    res.end(body);
    return;
  }

  res.end();
});

httpServer.listen(port, () => {
  const authSummary = requiredToken ? "requires bearer token" : "allows local access";
  console.log(`Toast remote MCP server is listening on http://localhost:${port}/mcp (${authSummary})`);
});
