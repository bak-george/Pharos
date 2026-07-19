import { parse } from "node-html-parser"

export function htmlToMarkdown(html) {
  const root = parse(html)

  return nodeToMarkdown(root)
}

function nodeToMarkdown(node) {
  if (node.nodeType === 3) {
    return node.text
  }

  if (node.nodeType === 1) {
    let content = ""

    for (const child of node.childNodes) {
      content += nodeToMarkdown(child)
    }

    return content
  }

  return ""
}
