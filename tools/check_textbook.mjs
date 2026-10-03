import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = path.resolve(import.meta.dirname, '../textbook')
const rows = JSON.parse(fs.readFileSync(path.join(root, '.vitepress/curriculum.json'), 'utf8'))
assert.equal(rows.length, 42)
assert.equal(new Set(rows.map(r => r.slug)).size, 42)
for (const [index, row] of rows.entries()) {
  assert.equal(row.number, index + 1)
  const body = fs.readFileSync(path.join(root, row.slug + '.md'), 'utf8')
  assert.equal(body.match(/^# (.+)$/m)?.[1], `${String(row.number).padStart(2, '0')} ${row.title}`)
  assert(body.includes('[目录](./)'), row.slug + ': missing TOC')
  if (index) assert(body.includes(`[上一章](${rows[index - 1].slug}.md)`), row.slug + ': previous')
  if (index < rows.length - 1) assert(body.includes(`[下一章](${rows[index + 1].slug}.md)`), row.slug + ': next')
  assert.equal((body.match(/<details>/g) ?? []).length, (body.match(/<\/details>/g) ?? []).length, row.slug + ': details')
  assert.equal((body.match(/^```/gm) ?? []).length % 2, 0, row.slug + ': code fence')
  for (const match of body.matchAll(/\[第\s*(\d+)\s*章[^\]]*\]\((\d\d)-[^)]+\.md\)/g)) {
    assert.equal(Number(match[1]), Number(match[2]), row.slug + ': wrong chapter label ' + match[0])
  }
  if (row.source !== row.slug && row.source !== 'housing-market') {
    const legacy = fs.readFileSync(path.join(root, row.source + '.md'), 'utf8')
    assert(legacy.includes('search: false'), row.source + ': legacy searchable')
    assert(legacy.includes(`${row.slug}.md`), row.source + ': missing destination')
  }
}
for (const file of fs.readdirSync(root).filter(f => f.endsWith('.md'))) {
  const body = fs.readFileSync(path.join(root, file), 'utf8')
  for (const [, target] of body.matchAll(/\]\(([^\s)]+\.md)(?:#[^)]*)?\)/g)) {
    if (/^https?:/.test(target)) continue
    assert(fs.existsSync(path.resolve(root, target)), `${file}: missing ${target}`)
  }
}
console.log('42 canonical chapters: titles, navigation, links, legacy entries and Markdown checks passed.')
