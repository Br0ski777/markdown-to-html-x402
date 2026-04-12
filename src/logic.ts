import type { Hono } from "hono";

function mdToHtml(md: string): string {
  let html = md;
  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `<pre><code class="language-${lang || 'text'}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()}</code></pre>`);
  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr>");
  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Links and images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Blockquote
  html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");
  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>");
  // Paragraphs (lines not already wrapped)
  html = html.replace(/^(?!<[a-z]).+$/gm, (line) => line.trim() ? `<p>${line}</p>` : "");
  // Clean empty paragraphs
  html = html.replace(/<p><\/p>/g, "");
  return html.trim();
}

export function registerRoutes(app: Hono) {
  app.post("/api/convert", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.markdown) return c.json({ error: "Missing required field: markdown" }, 400);
    const html = mdToHtml(body.markdown);
    const wrapped = body.wrapInDocument
      ? `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`
      : html;
    return c.json({ html: wrapped, inputLength: body.markdown.length, outputLength: wrapped.length, isDocument: !!body.wrapInDocument });
  });
}
