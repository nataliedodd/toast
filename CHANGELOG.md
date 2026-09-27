# Changelog

Notable changes to Toast are recorded here.

## [1.0.0] - 2026-09-27

First working local MCP release of Toast.

### Added

- `TOAST.md` manifest describing Toast's purpose and principles: reduce cognitive load, portability, career-portable professional knowledge, context boundaries, lightweight design, source awareness and AI independence.
- Personal home measurements, the professional MCP and web development learning plan, and Token Lab notes in portable Markdown files.
- A TypeScript project setup that compiles `src/server.ts` to `dist/server.js`, with `npm run toast` to compile and run the server.
- A local MCP server using `@modelcontextprotocol/server` v2 and stdio communication.
- The `get_home_measurements` tool, which reads `personal/home/measurements.md` on each request and returns the contents with the source identified.

### Verified

- Connected Toast to Claude Desktop and successfully retrieved the fridge measurements through the MCP tool.

### Learning

- Practiced Node.js and npm dependency setup, TypeScript compilation, MCP tools, stdio communication and MCP client configuration.

### Scope

- Personal and professional context folders express intended context domains. Access controls between domains have not been implemented in this release.