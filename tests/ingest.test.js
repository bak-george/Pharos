import { describe, it, expect } from "vitest";
import { filterUrlAndModDate } from "../src/ingest.js";

describe("filterUrlAndModDate", () => {
  it("returns an empty array when the XML has no <url> entries", () => {
    const xml = "<urlset></urlset>";
    expect(filterUrlAndModDate(xml)).toEqual([]);
  });
});
