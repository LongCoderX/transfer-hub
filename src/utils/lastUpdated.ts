import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = './src/content/posts';

const SITE_FILES = [
  'src/pages/index.astro',
  'src/pages/knowledge/index.astro',
  'src/pages/relays/index.astro',
  'src/pages/relays/[slug].astro',
  'src/pages/tools/index.astro',
  'data/relays.json',
];

export function gitLastCommitDate(filePath: string): string | null {
  try {
    const output = execSync(`git log -1 --format=%cs -- "${filePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return output.trim() || null;
  } catch {
    return null;
  }
}

export function getPostLastUpdated(fileName: string, fallback?: string): string {
  const filePath = path.join(POSTS_DIR, fileName);
  return gitLastCommitDate(filePath) ?? fallback ?? '';
}

export function getLastUpdated(): string {
  const dates: string[] = [];

  // Article files
  const entries = fs.readdirSync(POSTS_DIR);
  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    const date = getPostLastUpdated(entry);
    if (date) dates.push(date);
  }

  // Site-level files
  for (const file of SITE_FILES) {
    const date = gitLastCommitDate(file);
    if (date) dates.push(date);
  }

  return dates.sort().pop() ?? '';
}
