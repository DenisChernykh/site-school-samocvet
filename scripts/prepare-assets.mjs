import { mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const output = 'public/media';
await mkdir(output, { recursive: true });
for (const name of await readdir('design/assets')) {
  if (!/\.(png|jpg)$/.test(name)) continue;
  const input = path.join('design/assets', name);
  await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(output, name.replace(/\.(png|jpg)$/, '.webp')));
}
const symbols = {
  'd386af54c062a3ca.webp': 'interest.webp',
  'b0f7855ad3e355ce.webp': 'experience.webp',
  '23fc29107fe116e2.webp': 'community.webp',
};
for (const [input, name] of Object.entries(symbols)) {
  await copyFile(
    path.join('images/lanternfish-perch-m9gg.squarespace.com', input),
    path.join(output, name),
  );
}
console.log('Prepared local school photographs and Fieldnote illustrations.');
