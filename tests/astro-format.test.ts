import assert from 'node:assert/strict';
import test from 'node:test';
import { format, resolveConfig } from 'prettier';

// Older Astro formatters silently deleted adjacent JSX siblings in this pattern.
const fixture = `---
const members = [{ title: 'Имя педагога', role: 'Педагог', description: 'Описание' }];
---
<section>{members.map(member => <article><div>
  <h2>{member.title}</h2><p>{member.role}</p><p>{member.description}</p>
  {member.role && <a href="/team/">Команда</a>}
</div></article>)}</section>`;

test('Astro formatting preserves adjacent headings, roles and conditional links', async () => {
  const options = {
    ...(await resolveConfig(
      new URL('../.prettierrc.json', import.meta.url).pathname,
    )),
    parser: 'astro',
  };
  const output = await format(fixture, options);
  for (const expression of [
    'member.title',
    'member.role',
    'member.description',
  ]) {
    assert.equal(
      output.split(expression).length,
      fixture.split(expression).length,
      `${expression} must survive formatting`,
    );
  }
  assert.match(output, /<h2>\{member\.title\}<\/h2>/);
  assert.match(output, /<p>\{member\.role\}<\/p>/);
  assert.match(output, /<a href="\/team\/">Команда<\/a>/);
  assert.equal(await format(output, options), output);
});
