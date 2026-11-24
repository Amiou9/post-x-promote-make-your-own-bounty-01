// Entry for post-x-promote-make-your-own-bounty-01.
//
// The entry itself is the X post, not this program. All this program does
// is carry the post's address, held in POST.json at the repository root,
// into the output directory the grader reads.
//
// POST.json names one post: https://x.com/BayukNugro/status/2125019835021275421
// That post quotes make.fun's make-your-own-bounty post, carries an
// original photo, the line "Make your own bounty on @makefunai:
// https://make.fun/sponsor/new", and the play code
// makefun-clipper-origami-mallard. The house reads the post's replies,
// reposts and quotes from X; nothing this program writes is scored.
//
// Run locally the same way the starter documents it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(botDir, 'POST.json');
const targetPath = join(outputDir, 'POST.json');

const text = readFileSync(sourcePath, 'utf8');
const post = JSON.parse(text);

if (
  typeof post.url !== 'string' ||
  !post.url.startsWith('https://x.com/') ||
  !post.url.includes('/status/')
) {
  console.error(`POST.json does not name an x.com post: ${post.url}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, text);
