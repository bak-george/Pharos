import { describe, it, expect } from "vitest";
import { htmlToMarkdown } from "../src/markdown.js";

describe("htmlToMarkdown", () => {
  it("returns plain text when the input has no HTML tags", () => {
    expect(htmlToMarkdown("Hello world")).toBe("Hello world");
  });

  it("returns the text content of a single paragraph", () => {
    expect(htmlToMarkdown("<p>Hello world</p>")).toBe("Hello world");
  });

  it("concatenates text across sibling elements", () => {
    expect(htmlToMarkdown("<p>First.</p><p>Second.</p>")).toBe("First.Second.");
  });

  it("recurses into nested elements", () => {
    expect(htmlToMarkdown("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });
});
