# Learning Plan: MCP & Web Development

## Why I’m learning this

Build confidence in creating and deploying software, particularly where it intersects with AI product design.

My practical project is **Toast**: a portable context layer designed to reduce the mental load of remembering, finding and repeatedly explaining information across life and work.

This learning belongs in **Professional** context so it remains portable throughout my career.

## Learning approach

- Learn by building real things.
- Understand the code rather than only copying it.
- Keep each step small and understandable.
- Use AI as a coding partner.
- Record useful discoveries without creating unnecessary admin.
- Add complexity only when it solves a real problem.

## Project 1 — Toast v1.0.0: Local MCP

### Build

Create a local MCP server that retrieves information from:

`personal/home/measurements.md`

### Learn

- Node.js and npm
- `package.json` and JSON
- TypeScript fundamentals
- MCP clients and servers
- MCP tools and resources
- Running and debugging locally
- Git, commits and semantic versioning

### Progress

- [x] Create and clone the Toast repository.
- [x] Write `TOAST.md` with its purpose and principles.
- [x] Save the initial home measurements.
- [x] Initialise `package.json` with version `1.0.0`.
- [x] Save this learning plan and the Token Lab notes.
- [x] Set up TypeScript.
- [x] Install the MCP SDK.
- [x] Build the smallest useful Toast MCP server.
- [x] Run and test it locally.
- [x] Connect an MCP-compatible AI client.
- [x] Complete the success test: retrieved the fridge measurements through Claude Desktop.
- [ ] Record and tag the first working release.

### Success test

Ask an AI connected to Toast:

> What are the dimensions of my current fridge?

The AI retrieves the answer from Toast without me supplying the measurements in the conversation.

## Project 2 — nataliedodd.co.uk: Web Development

### Build

Replace my Squarespace website with a website I build, version and deploy myself.

Keep the public website and private Toast context in separate repositories.

### Learn

- HTML and CSS
- JavaScript and TypeScript
- Responsive design
- Accessibility
- Git and GitHub workflows
- Hosting and deployment
- Domains, DNS and HTTPS

### Success test

`nataliedodd.co.uk` runs from my own codebase and deploys through a GitHub-connected workflow.

## Project 3 — Toast Remote

### Build

Make Toast available through a secure remote MCP server, without requiring it to run locally on my Mac.

### Learn

- HTTP and APIs
- Remote MCP connections
- Cloud hosting
- Environment variables and secrets
- Authentication
- Logging and debugging
- Running costs and basic security

### Success test

An authorised MCP-compatible AI client can retrieve Toast context while the local server on my Mac is stopped. Unauthorised requests cannot retrieve it.

## Project 4 — Toast Context Architecture

### Build

Implement independently controlled access to Toast’s three context domains:

- **Personal:** my life, home and personal projects.
- **Professional:** portable learning, methods and reusable tools.
- **Employer:** employer-specific information, stored only where permitted.

These boundaries guide the design from the beginning; this project implements and tests the access controls.

### Learn

- Information architecture
- Data modelling
- Authentication versus authorisation
- Permissions and privacy boundaries
- Context isolation
- Source-aware retrieval

### Success test

A client authorised for one domain cannot retrieve information from another unless explicitly granted access.

Professional knowledge remains portable when I change jobs, while employer-specific context stays separate.

## Project 5 — Smarter Toast

### Build

Find relevant context without requiring the AI to know the exact filename.

For example:

> Will this fridge fit in my kitchen?

Toast should retrieve the relevant measurements, distinguish the current fridge from the available space, and identify missing information.

### Learn

- Search and retrieval
- Structured versus unstructured information
- Useful metadata
- Source attribution
- Handling unknown or outdated information
- Semantic search, only if simpler approaches prove insufficient

### Success test

Toast retrieves the relevant recorded information, identifies its source and flags unknowns instead of inventing answers.

## Ongoing Learning — Token Lab

Keep experiments in:

`professional/learning/token-lab.md`

### Goal

Understand token usage and context efficiency without sacrificing answer quality.

### Explore

- What tokens are and how they are counted.
- Input versus output tokens.
- Estimated token counts versus reported API usage.
- Full-file retrieval versus targeted retrieval.
- How context size affects usage and cost.
- When summarisation helps or loses useful detail.

### First experiment

Compare providing the whole measurements file with retrieving only the current fridge section.

Record:

- The model and counting method.
- The context supplied.
- Input and output usage, where available.
- Whether counts are estimated or reported.
- Whether answer quality changed.

Build a tracker or dashboard once I understand what it needs to measure.

## Releases and Learning Notes

Use semantic versioning:

- **PATCH:** backwards-compatible fixes.
- **MINOR:** backwards-compatible new capabilities.
- **MAJOR:** breaking changes.

Version numbers describe changes, not the numbered projects in this plan.

For each completed release:

1. Review what changed and what I learned.
2. Update `CHANGELOG.md`.
3. Confirm the version in `package.json`.
4. Commit the release and create its Git tag.
5. Add GitHub release notes.

`1.0.0` is the target first working release. Having that number in `package.json` does not mean the release is complete.

## Guiding Principle

Toast should reduce cognitive load, not become another system that needs constant maintenance.