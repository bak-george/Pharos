import { parse } from "node-html-parser"

export function extractArticle(html) {
  const root = parse(html)
  const articleElement = root.querySelector("article")

  if (!articleElement) {
    throw new Error("No <article> element found in the HTML.")
  }

  const headingOfArticle = articleElement.querySelector("h1")
  const dateTimeOfArticle = articleElement.querySelector("time")
  const articleContent = articleElement.querySelector(".article-content")

  return {
    title: headingOfArticle.text.trim(),
    date: dateTimeOfArticle.getAttribute("datetime"),
    body: articleContent.toString()
  }
}
