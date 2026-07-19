import { parse } from "node-html-parser"

const NodeType = Object.freeze({
  ELEMENT: 1,
  TEXT: 3
})

export function htmlToMarkdown(html) {
  const root = parse(html)

  return nodeToMarkdown(root)
}

function nodeToMarkdown(node) {
  if (node.nodeType === NodeType.TEXT) {
    return node.text
  }

  if (node.nodeType === NodeType.ELEMENT) {
    let content = ""

    for (const child of node.childNodes) {
      content += nodeToMarkdown(child)
    }

    return content
  }

  return ""
}
