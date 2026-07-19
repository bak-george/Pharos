import { describe, it, expect } from "vitest";
import { htmlToMarkdown } from "../src/markdown.js";

describe("htmlToMarkdown", () => {
  describe("recursion basics", () => {
    it("returns plain text when the input has no HTML tags", () => {
      expect(htmlToMarkdown("Hello world")).toBe("Hello world");
    });

    it("recurses into unknown tags (children pass through)", () => {
      expect(htmlToMarkdown("<p>Hello <b>world</b></p>")).toBe("Hello world\n\n");
    });

    it("concatenates markdown across sibling elements", () => {
      expect(htmlToMarkdown("<p>First.</p><p>Second.</p>")).toBe("First.\n\nSecond.\n\n");
    });
  });

  describe("paragraphs", () => {
    it("wraps <p> content with a trailing blank line", () => {
      expect(htmlToMarkdown("<p>Hello world</p>")).toBe("Hello world\n\n");
    });
  });

  describe("headings", () => {
    it("wraps <h1> with # prefix", () => {
      expect(htmlToMarkdown("<h1>Title</h1>")).toBe("# Title\n\n");
    });

    it("wraps <h2> with ## prefix", () => {
      expect(htmlToMarkdown("<h2>Section</h2>")).toBe("## Section\n\n");
    });

    it("wraps <h3> with ### prefix", () => {
      expect(htmlToMarkdown("<h3>Subsection</h3>")).toBe("### Subsection\n\n");
    });
  });

  describe("inline formatting", () => {
    it("wraps <strong> with **", () => {
      expect(htmlToMarkdown("<strong>bold</strong>")).toBe("**bold**");
    });

    it("wraps <em> with *", () => {
      expect(htmlToMarkdown("<em>italic</em>")).toBe("*italic*");
    });

    it("wraps <code> with backticks", () => {
      expect(htmlToMarkdown("<code>x</code>")).toBe("`x`");
    });
  });

  describe("links", () => {
    it("wraps <a> with markdown link syntax", () => {
      expect(htmlToMarkdown('<a href="https://example.com">docs</a>'))
        .toBe("[docs](https://example.com)");
    });

    it("keeps inline formatting inside a link", () => {
      expect(htmlToMarkdown('<a href="https://example.com"><strong>bold</strong> text</a>'))
        .toBe("[**bold** text](https://example.com)");
    });
  });

  describe("lists", () => {
    it("emits a single <li> with a dash prefix", () => {
      expect(htmlToMarkdown("<li>Only</li>")).toBe("- Only\n");
    });

    it("emits <ul> with two <li> items as a bulleted list", () => {
      expect(htmlToMarkdown("<ul><li>First</li><li>Second</li></ul>"))
        .toBe("- First\n- Second\n\n");
    });
  });

  describe("code blocks", () => {
    it("wraps <pre><code language-XX> in a fenced block with the language", () => {
      expect(htmlToMarkdown('<pre><code class="language-js">const x = 1;</code></pre>'))
        .toBe("```js\nconst x = 1;\n```\n\n");
    });

    it("handles a different language class", () => {
      expect(htmlToMarkdown('<pre><code class="language-php">echo 1;</code></pre>'))
        .toBe("```php\necho 1;\n```\n\n");
    });

    it("falls back to a language-less fence when <pre> has no <code>", () => {
      expect(htmlToMarkdown("<pre>raw text</pre>"))
        .toBe("```\nraw text\n```\n\n");
    });
  });
});
