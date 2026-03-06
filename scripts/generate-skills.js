#!/usr/bin/env node

import {
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const tokensSchemaPath = path.join(
  repoRoot,
  'packages/design-tokens/themes/schema.ts',
);
const lightTokensPath = path.join(
  repoRoot,
  'packages/design-tokens/themes/light.ts',
);
const darkTokensPath = path.join(
  repoRoot,
  'packages/design-tokens/themes/dark.ts',
);
const sharedTokensPath = path.join(
  repoRoot,
  'packages/design-tokens/themes/shared.ts',
);
const circuitUIPackagePath = path.join(repoRoot, 'packages/circuit-ui');
const exportsPath = path.join(repoRoot, 'packages/circuit-ui/index.ts');
const referencesDir = path.join(repoRoot, 'skills/circuit-ui/references');
const componentReferencesDir = path.join(referencesDir, 'components');

const TOKEN_SCHEMA_PATTERN =
  /\{\s*name:\s*'([^']+)'\s*,\s*type:\s*'([^']+)'\s*(?:,\s*deprecation:\s*\{\s*replacement:\s*'([^']+)'\s*\}\s*)?\}/gms;
const TOKEN_VALUE_PATTERN =
  /\{\s*name:\s*'([^']+)'\s*,\s*value:\s*(?:'((?:\\'|[^'])*)'|(-?\d+(?:\.\d+)?))\s*,\s*type:\s*'([^']+)'\s*,?\s*\}/gms;
const EXPORT_STATEMENT_PATTERN =
  /export\s*\{([\s\S]*?)\}\s*from\s*'([^']+)'\s*;/m;

function parseTokens(schemaSource) {
  const tokens = [];
  let match = TOKEN_SCHEMA_PATTERN.exec(schemaSource);
  while (match !== null) {
    tokens.push({
      name: match[1],
      type: match[2],
      replacement: match[3] ?? null,
    });
    match = TOKEN_SCHEMA_PATTERN.exec(schemaSource);
  }

  return tokens;
}

function parseTokenValues(themeSource) {
  const values = new Map();
  let match = TOKEN_VALUE_PATTERN.exec(themeSource);
  while (match !== null) {
    const value = match[2] ?? match[3] ?? '';
    values.set(match[1], value);
    match = TOKEN_VALUE_PATTERN.exec(themeSource);
  }

  return values;
}

function shouldIncludeComponentName(name) {
  return /^[A-Z][A-Za-z0-9]*$/.test(name) && /[a-z]/.test(name);
}

function parseExportedNames(exportClause) {
  return exportClause
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .filter((entry) => !entry.startsWith('type '))
    .map((entry) => entry.replace(/^type\s+/, ''));
}

function addComponentsFromExportStatement(
  statement,
  section,
  components,
  seen,
) {
  const statementMatch = statement.match(EXPORT_STATEMENT_PATTERN);
  if (!statementMatch) {
    return;
  }

  const source = statementMatch[2];
  if (!source.includes('/components/')) {
    return;
  }

  const names = parseExportedNames(statementMatch[1]);

  for (const name of names) {
    if (!shouldIncludeComponentName(name) || seen.has(name)) {
      continue;
    }

    components.push({
      name,
      section,
      source,
    });
    seen.add(name);
  }
}

function parseComponents(exportsSource) {
  const lines = exportsSource.split('\n');
  const components = [];
  const seen = new Set();
  let section = 'Uncategorized';

  let exportLines = [];
  let exportSection = section;

  for (const line of lines) {
    const sectionMatch = line.match(/^\/\/\s+(.+)$/);
    if (sectionMatch) {
      section = sectionMatch[1].trim();
      continue;
    }

    if (exportLines.length === 0 && line.trim().startsWith('export {')) {
      exportLines = [line];
      exportSection = section;
      if (line.trim().endsWith(';')) {
        addComponentsFromExportStatement(
          exportLines.join('\n'),
          exportSection,
          components,
          seen,
        );
        exportLines = [];
        exportSection = section;
      }
      continue;
    }

    if (exportLines.length > 0) {
      exportLines.push(line);
      if (!line.trim().endsWith(';')) {
        continue;
      }

      addComponentsFromExportStatement(
        exportLines.join('\n'),
        exportSection,
        components,
        seen,
      );
      exportLines = [];
      exportSection = section;
    }
  }

  return components;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function resolveComponentDirectory(sourcePath) {
  const relativePath = sourcePath.replace(/^\.\//, '');
  return path.dirname(path.join(circuitUIPackagePath, relativePath));
}

async function resolveComponentMdxPath(component) {
  const componentDir = resolveComponentDirectory(component.source);
  const exportFileName = path.basename(component.source, '.js');

  // Most components colocate docs by either export name or base file name.
  const prioritized = [
    path.join(componentDir, `${component.name}.mdx`),
    path.join(componentDir, `${exportFileName}.mdx`),
  ];

  for (const candidate of prioritized) {
    if (await exists(candidate)) {
      return candidate;
    }
  }

  try {
    // Fallback: some component folders only contain one MDX guide with a generic name.
    const entries = await readdir(componentDir);
    const mdxFiles = entries
      .filter((entry) => entry.endsWith('.mdx'))
      .toSorted((a, b) => a.localeCompare(b));

    if (mdxFiles.length > 0) {
      return path.join(componentDir, mdxFiles[0]);
    }
  } catch {
    return null;
  }

  return null;
}

async function buildComponentResources(components) {
  await rm(componentReferencesDir, { recursive: true, force: true });
  await mkdir(componentReferencesDir, { recursive: true });

  const resolved = [];

  for (const component of components) {
    const mdxPath = await resolveComponentMdxPath(component);
    let docsPath = null;

    if (mdxPath) {
      const mdxSource = await readFile(mdxPath, 'utf8');
      docsPath = `components/${component.name}.mdx`;
      await writeFile(path.join(referencesDir, docsPath), mdxSource, 'utf8');
    }

    resolved.push({
      ...component,
      docsPath,
    });
  }

  return resolved;
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
      const light =
        lightValues.get(token.name) ?? sharedValues.get(token.name) ?? '';
      const dark =
        darkValues.get(token.name) ?? sharedValues.get(token.name) ?? '';

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
  const withDocsCount = components.filter(
    (component) => component.docsPath,
  ).length;

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
        .map((component) => {
          const docsLink = component.docsPath
            ? `[Read MDX reference](${component.docsPath})`
            : 'Not available';

          return `| \`${component.name}\` | \`@sumup-oss/circuit-ui\` | \`${component.source}\` | ${docsLink} |`;
        })
        .join('\n');

      return `### ${section}\n\n| Component | Package | Source export | Usage reference |\n| --- | --- | --- | --- |\n${rows}`;
    })
    .join('\n\n');

  return `# Circuit UI Components

Generated from \`packages/circuit-ui/index.ts\`.
Component references are copied from \`packages/circuit-ui/components/**/*.mdx\`.

- Total exported components: **${components.length}**
- Components with copied MDX references: **${withDocsCount}**

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
    throw new Error(
      'No tokens were parsed from packages/design-tokens/themes/schema.ts',
    );
  }

  if (components.length === 0) {
    throw new Error(
      'No components were parsed from packages/circuit-ui/index.ts',
    );
  }

  await mkdir(referencesDir, { recursive: true });
  const componentsWithDocs = await buildComponentResources(components);

  await Promise.all([
    writeFile(
      path.join(referencesDir, 'design-tokens.md'),
      renderTokensMarkdown(tokens, lightValues, darkValues, sharedValues),
      'utf8',
    ),
    writeFile(
      path.join(referencesDir, 'components.md'),
      renderComponentsMarkdown(componentsWithDocs),
      'utf8',
    ),
  ]);

  process.stdout.write(
    `Generated ${tokens.length} tokens and ${components.length} component index entries in skills/circuit-ui/references.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exit(1);
});
