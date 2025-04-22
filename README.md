# plaoc-mcp

本项目基于 [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk) 实现了 MCP (Model Context Protocol) 服务，并集成了 [@plaoc/cli](https://www.npmjs.com/package/@plaoc/cli) 工具，支持一键构建和本地服务 `Dweb` 应用。

## 目录结构

- `server.ts`：MCP 服务主入口，注册了 `plaoc_serve` 工具。
- `examples/`：示例 `Dweb` 应用项目。
- 其他相关源码和配置文件。

## 环境准备

1. 安装 [Deno](https://docs.deno.com/runtime/getting_started/installation/)。
2. 确保已安装 Node.js（用于 npm 包管理）。

## 如何添加 MCP 工具

```typescript
{
  "mcpServers": {
    "plaoc-mcp": {
      "command": "deno",
      "args": [
        "run",
        "-A",
        "path/to/your/server.ts"
      ]
    }
  }
}
```