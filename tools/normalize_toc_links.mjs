// Mechanical link normalization: README is rewritten to index by the site.
// ./ also opens the directory README on GitHub, so both reading modes work.
import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '../textbook')
for (const file of fs.readdirSync(root).filter(f => f.endsWith('.md'))) {
  const target = path.join(root, file)
  const before = fs.readFileSync(target, 'utf8')
  const after = before.replaceAll('](README.md)', '](./)')
  if (before !== after) fs.writeFileSync(target, after)
}
