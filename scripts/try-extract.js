import { readFileSync } from "node:fs";
import { extractArticle } from "../src/extract.js";

const page = readFileSync("tests/fixtures/blog-post.html", "utf-8");

const { title, date, body } = extractArticle(page);

console.log("title:", title);
console.log("date:", date);
console.log("body length:", body?.length);
console.log("body start:", body?.slice(0, 200));
