import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.argv[2] ?? '')

if (!root || !fs.existsSync(root)) {
  throw new Error(`Content directory does not exist: ${root}`)
}

let changedFiles = 0

const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vuepress' || entry.name === 'node_modules') continue

    const filePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      visit(filePath)
      continue
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) continue

    const source = fs.readFileSync(filePath, 'utf8')
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)

    if (!match) continue

    const frontmatter = match[1]
    const preparedFrontmatter = frontmatter
      .replace(/^prev:/gm, 'obsidian_prev:')
      .replace(/^next:/gm, 'obsidian_next:')

    if (preparedFrontmatter === frontmatter) continue

    const preparedSource = source.replace(frontmatter, preparedFrontmatter)
    fs.writeFileSync(filePath, preparedSource, 'utf8')
    changedFiles += 1
  }
}

visit(root)
console.log(`Prepared VuePress frontmatter in ${changedFiles} Markdown files.`)
