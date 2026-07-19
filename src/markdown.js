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

    switch (node.rawTagName) {
      case "p": return content + "\n\n"
      case "h1": return `# ${content}\n\n`
      default: return content
    }
  }

  return ""
}
