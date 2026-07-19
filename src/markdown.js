import { parse } from "node-html-parser"

const NodeType = Object.freeze({
  ELEMENT: 1,
  TEXT: 3
})

export function htmlToMarkdown(html) {
  const root = parse(html, {
    blockTextElements: {
      script: true,
      noscript: true,
      style: true
    }
  })

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
      case "h2": return `## ${content}\n\n`
      case "h3": return `### ${content}\n\n`
      case "strong": return `**${content}**`
      case "em": return `*${content}*`
      case "code": return `\`${content}\``
      case "a": return `[${content}](${node.getAttribute("href")})`
      case "li": return `- ${content}\n`
      case "ul": return `${content}\n`
      case "pre": {
        const codeChild = node.querySelector("code")
        if (!codeChild) return `\`\`\`\n${content}\n\`\`\`\n\n`

        const classAttr = codeChild.getAttribute("class") || ""
        const language = classAttr.startsWith("language-") ? classAttr.slice("language-".length) : ""

        return `\`\`\`${language}\n${codeChild.text}\n\`\`\`\n\n`
      }
      default: return content
    }
  }

  return ""
}
