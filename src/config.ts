import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "markdown-to-html",
  slug: "markdown-to-html",
  description: "Convert markdown to clean HTML with headings, lists, code blocks, tables, and inline formatting.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/convert",
      price: "$0.001",
      description: "Convert markdown text to HTML",
      toolName: "text_convert_markdown_to_html",
      toolDescription: "Use this when you need to convert markdown text to HTML. Supports headings, bold, italic, links, images, code blocks, lists, tables, blockquotes, and horizontal rules. Returns clean HTML string. Do NOT use for HTML to markdown — use text_convert_html_to_markdown instead. Do NOT use for PDF generation — use document_generate_pdf instead.",
      inputSchema: {
        type: "object",
        properties: {
          markdown: { type: "string", description: "Markdown text to convert" },
          wrapInDocument: { type: "boolean", description: "Wrap output in full HTML document (default: false)" },
        },
        required: ["markdown"],
      },
    },
  ],
};
