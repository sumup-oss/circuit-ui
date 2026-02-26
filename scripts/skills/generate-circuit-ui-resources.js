#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const tokensSchemaPath = path.join(
  repoRoot,
  'packages/design-tokens/themes/schema.ts',
);
const lightTokensPath = path.join(repoRoot, 'packages/design-tokens/themes/light.ts');
const darkTokensPath = path.join(repoRoot, 'packages/design-tokens/themes/dark.ts');
const sharedTokensPath = path.join(
  repoRoot,
  'packages/design-tokens/themes/shared.ts',
);
const exportsPath = path.join(repoRoot, 'packages/circuit-ui/index.ts');
const referencesDir = path.join(repoRoot, 'skills/circuit-ui/references');

function parseTokens(schemaSource) {
  const tokens = [];
  const tokenPattern =
    /\{\s*name:\s*'([^']+)'\s*,\s*type:\s*'([^']+)'\s*(?:,\s*deprecation:\s*\{\s*replacement:\s*'([^']+)'\s*\}\s*)?\}/gms;

  let match = tokenPattern.exec(schemaSource);
  while (match !== null) {
    tokens.push({
      name: match[1],
      type: match[2],
      replacement: match[3] ?? null,
    });
    match = tokenPattern.exec(schemaSource);
  }

  return tokens;
}

function parseTokenValues(themeSource) {
  const values = new Map();
  const tokenPattern =
    /\{\s*name:\s*'([^']+)'\s*,\s*value:\s*(?:'((?:\\'|[^'])*)'|(-?\d+(?:\.\d+)?))\s*,\s*type:\s*'([^']+)'\s*,?\s*\}/gms;

  let match = tokenPattern.exec(themeSource);
  while (match !== null) {
    const value = match[2] ?? match[3] ?? '';
    values.set(match[1], value);
    match = tokenPattern.exec(themeSource);
  }

  return values;
}

function parseComponents(exportsSource) {
  const lines = exportsSource.split('\n');
  const components = [];
  const seen = new Set();
  let section = 'Uncategorized';

  let statement = '';
  let statementSection = section;

  for (const line of lines) {
    const sectionMatch = line.match(/^\/\/\s+(.+)$/);
    if (sectionMatch) {
      section = sectionMatch[1].trim();
      continue;
    }

    if (!statement && line.trim().startsWith('export {')) {
      statement = line;
      statementSection = section;
    } else if (statement) {
      statement += `\n${line}`;
    }

    if (statement && line.includes(';')) {
      const statementMatch = statement.match(
        /export\s*\{([\s\S]*?)\}\s*from\s*'([^']+)'\s*;/m,
      );

      if (statementMatch) {
        const names = statementMatch[1]
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean)
          .filter((entry) => !entry.startsWith('type '))
          .map((entry) => entry.replace(/^type\s+/, ''));

        for (const name of names) {
          if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
            continue;
          }

          if (!/[a-z]/.test(name)) {
            continue;
          }

          if (!statementMatch[2].includes('/components/')) {
            continue;
          }

          if (seen.has(name)) {
            continue;
          }

          components.push({
            name,
            section: statementSection,
            source: statementMatch[2],
          });
          seen.add(name);
        }
      }

      statement = '';
      statementSection = section;
    }
  }

  return components;
}

function renderTokensMarkdown(tokens, lightValues, darkValues, sharedValues) {
  const counts = tokens.reduce((acc, token) => {
    acc[token.type] = (acc[token.type] ?? 0) + 1;
    return acc;
  }, {});

  const sortedTypes = Object.keys(counts).sort();
  const summaryRows = sortedTypes
    .map((type) => `| \`${type}\` | ${counts[type]} |`)
    .join('\n');

  const missingValues = [];

  const tokenRows = tokens
    .map((token) => {
      const deprecated = token.replacement ? 'yes' : 'no';
      const replacement = token.replacement ? `\`${token.replacement}\`` : '';
      const light = lightValues.get(token.name) ?? sharedValues.get(token.name) ?? '';
      const dark = darkValues.get(token.name) ?? sharedValues.get(token.name) ?? '';

      if (!light || !dark) {
        missingValues.push(token.name);
      }

      const lightValue = light ? `\`${light}\`` : '';
      const darkValue = dark ? `\`${dark}\`` : '';

      return `| \`${token.name}\` | \`${token.type}\` | ${deprecated} | ${replacement} | ${lightValue} | ${darkValue} |`;
    })
    .join('\n');

  return `# Circuit UI Design Tokens

Generated from \`packages/design-tokens/themes/schema.ts\`.
Values resolved from \`themes/light.ts\`, \`themes/dark.ts\`, and \`themes/shared.ts\`.

- Total tokens: **${tokens.length}**
- Tokens without full light/dark values: **${missingValues.length}**

## Token Types

| Type | Count |
| --- | ---: |
${summaryRows}

## Token Inventory

| Token | Type | Deprecated | Replacement | Light Value | Dark Value |
| --- | --- | --- | --- | --- | --- |
${tokenRows}
`;
}

function renderComponentsMarkdown(components) {
  const bySection = new Map();

  for (const component of components) {
    const sectionItems = bySection.get(component.section) ?? [];
    sectionItems.push(component);
    bySection.set(component.section, sectionItems);
  }

  const sections = [...bySection.keys()].sort();
  const sectionBlocks = sections
    .map((section) => {
      const rows = bySection
        .get(section)
        .toSorted((a, b) => a.name.localeCompare(b.name))
        .map(
          (component) =>
            `| \`${component.name}\` | \`@sumup-oss/circuit-ui\` | \`${component.source}\` |`,
        )
        .join('\n');

      return `### ${section}\n\n| Component | Package | Source export |\n| --- | --- | --- |\n${rows}`;
    })
    .join('\n\n');

  return `# Circuit UI Components

Generated from \`packages/circuit-ui/index.ts\`.

- Total exported components: **${components.length}**

## Sections

${sectionBlocks}
`;
}

async function main() {
  const [schemaSource, lightSource, darkSource, sharedSource, exportsSource] =
    await Promise.all([
      readFile(tokensSchemaPath, 'utf8'),
      readFile(lightTokensPath, 'utf8'),
      readFile(darkTokensPath, 'utf8'),
      readFile(sharedTokensPath, 'utf8'),
      readFile(exportsPath, 'utf8'),
    ]);

  const tokens = parseTokens(schemaSource);
  const lightValues = parseTokenValues(lightSource);
  const darkValues = parseTokenValues(darkSource);
  const sharedValues = parseTokenValues(sharedSource);
  const components = parseComponents(exportsSource);

  if (tokens.length === 0) {
    throw new Error('No tokens were parsed from packages/design-tokens/themes/schema.ts');
  }

  if (components.length === 0) {
    throw new Error('No components were parsed from packages/circuit-ui/index.ts');
  }

  await mkdir(referencesDir, { recursive: true });

  await Promise.all([
    writeFile(
      path.join(referencesDir, 'design-tokens.md'),
      renderTokensMarkdown(tokens, lightValues, darkValues, sharedValues),
      'utf8',
    ),
    writeFile(
      path.join(referencesDir, 'components.md'),
      renderComponentsMarkdown(components),
      'utf8',
    ),
  ]);

  process.stdout.write(
    `Generated ${tokens.length} tokens and ${components.length} components in skills/circuit-ui/references.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
