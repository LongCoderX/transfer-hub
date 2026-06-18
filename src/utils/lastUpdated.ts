import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.resolve('./src/content/posts');

export function getLastUpdated(): string {
  const entries = fs.readdirSync(POSTS_DIR);
  let latest = 0;

  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    const stat = fs.statSync(path.join(POSTS_DIR, entry));
    if (stat.mtimeMs > latest) {
      latest = stat.mtimeMs;
    }
  }

  // Fallback to current time if no markdown files exist
  const d = new Date(latest || Date.now());
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
