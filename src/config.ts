import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "markdown-to-html",
  slug: "markdown-to-html",
  description: "Convert Markdown to clean HTML -- headings, lists, code blocks, tables, links, images. Optional full document wrap.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/convert",
      price: "$0.001",
      description: "Convert markdown text to HTML",
      toolName: "text_convert_markdown_to_html",
      toolDescription: `Use this when you need to convert Markdown text to clean HTML. Returns the converted HTML in JSON.

Returns: 1. html (converted HTML string) 2. inputLength (character count of markdown) 3. outputLength (character count of HTML) 4. elements detected (headings, lists, code blocks, tables, links, images).

Example output: {"html":"<h1>Hello World</h1>\\n<p>This is <strong>bold</strong> and <em>italic</em>.</p>","inputLength":42,"outputLength":68}

Use this FOR rendering markdown content in web apps, converting README files, building documentation pages, and email template generation from markdown.

Do NOT use for HTML to markdown -- use text_convert_html_to_markdown instead. Do NOT use for styled HTML with CSS themes -- use text_render_markdown instead. Do NOT use for PDF generation -- use document_generate_pdf instead.`,
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
