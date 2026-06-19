import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = './src/content/posts';

function gitLastCommitDate(filePath: string): string | null {
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
  const entries = fs.readdirSync(POSTS_DIR);
  let latest = '';

  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    const date = getPostLastUpdated(entry);
    if (date && date > latest) {
      latest = date;
    }
  }

  return latest;
}
