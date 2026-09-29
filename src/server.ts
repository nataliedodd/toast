import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { createToastServer } from "./toast.js";

const isDirectEntry = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isDirectEntry) {
  const server = await createToastServer();
  await server.connect(new StdioServerTransport());
  console.error("Toast MCP server is ready.");
}

export { createToastServer };
