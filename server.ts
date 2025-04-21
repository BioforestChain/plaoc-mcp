import { McpServer } from "npm:@modelcontextprotocol/sdk@1.10.1/server/mcp.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk@1.10.1/server/stdio.js";
import { z } from "npm:zod@3.24.3";
import { join } from "node:path";

const server = new McpServer({
  name: "@plaoc/cli",
  version: "0.0.1",
});

server.tool(
  "plaoc_serve",
  {
    path: z.string().describe("Provider dweb app path to plaoc serve"),
    port: z
      .number()
      .optional()
      .describe("Provider port to plaoc serve is optional"),
    buildOptions: z
      .object({
        command: z.string().describe("Build command"),
        output: z.string().describe("Build output path"),
      })
      .optional()
      .describe("Provider build options to plaoc serve is optional"),
  },
  async ({ path, port, buildOptions }) => {
    let buildResult = true;
    let buildPath = path;
    if (buildOptions) {
      const result = new Deno.Command("deno", {
        cwd: path,
        args: ["task", buildOptions.command],
        stdout: "piped",
        stderr: "piped",
      }).outputSync();
      buildResult = result.success;
      buildPath = join(path, buildOptions.output);
    }

    if (!buildResult) {
      return {
        content: [{ type: "text", text: "Build failed" }],
      };
    }

    const args = ["run", "-A", "npm:@plaoc/cli", "serve", buildPath];
    if (port) {
      args.push("--port", port.toString());
    }

    const result = await new Deno.Command("deno", {
      args,
      stdout: "piped",
      stderr: "piped",
    })
      .output()
      .then((r) => new TextDecoder().decode(r.stdout));

    return {
      content: [{ type: "text", text: result }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
