# Toast

A private, portable MCP context layer designed to reduce cognitive load across life and work.

Toast keeps personal and professional context in portable files and makes selected context available to MCP clients. The context folders describe intended domains; access controls between those domains have not been implemented.

## Requirements

- Node.js 20 or later
- npm

## Install and run

From the repository root, install the dependencies and start Toast:

```sh
npm install
npm run toast
```

The `toast` script compiles `src/server.ts` with TypeScript into `dist/server.js`, then runs the compiled server with Node.js. The local MCP server communicates over standard input and output and remains running until stopped.

## Connect an MCP client

An MCP client launches the compiled server directly; it does not run `npm run toast`. After dependencies are installed and the TypeScript source has been compiled, configure the client to run `node` with the absolute path to `dist/server.js` as its argument. For example:

```json
{
	"command": "node",
	"args": ["/absolute/path/to/toast/dist/server.js"]
}
```

Replace the example path with the location of this checkout. The client starts the server process and communicates with it over stdio. Toast currently provides the `get_home_measurements` tool, which reads `personal/home/measurements.md` on each request and identifies that file as its source.
