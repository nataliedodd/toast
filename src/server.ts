import { readFile } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";

const server = new McpServer({
  name: "toast",
  version: "1.0.0"
});

server.registerTool(
  "get_home_measurements",
  {
    description:
      "Read recorded home measurements, including the current fridge, fridge area and kitchen door.",
    annotations: {
      readOnlyHint: true
    }
  },
  async () => {
    const file = new URL(
      "../personal/home/measurements.md",
      import.meta.url
    );

    const measurements = await readFile(file, "utf8");

    return {
      content: [
        {
          type: "text",
          text: `Source: personal/home/measurements.md\n\n${measurements}`
        }
      ]
    };
  }
);
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("Toast MCP server is ready.");