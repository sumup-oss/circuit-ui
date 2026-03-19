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
const hookReferencesDir = path.join(referencesDir, 'hooks');

const TOKEN_SCHEMA_PATTERN =
  /\{\s*name:\s*'([^']+)'\s*,\s*type:\s*'([^']+)'\s*(?:,\s*deprecation:\s*\{\s*replacement:\s*'([^']+)'\s*\}\s*)?\}/gms;
const TOKEN_VALUE_PATTERN =
  /\{\s*name:\s*'([^']+)'\s*,\s*value:\s*(?:'((?:\\'|[^'])*)'|(-?\d+(?:\.\d+)?))\s*,\s*type:\s*'([^']+)'\s*,?\s*\}/gms;
const EXPORT_STATEMENT_PATTERN =
  /export\s*\{([\s\S]*?)\}\s*from\s*'([^']+)'\s*;/m;
const STATUS_MDX_PATTERN = /<Status\s+variant="([^"]+)"/;
const STATUS_TAG_PATTERN = /status:([a-z-]+)/;

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

function shouldIncludeHookName(name) {
  return /^use[A-Z][A-Za-z0-9]*$/.test(name);
}

function parseExportedNames(exportClause) {
  return exportClause
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .filter((entry) => !entry.startsWith('type '))
    .map((entry) => entry.replace(/^type\s+/, ''))
    .map((entry) => {
      const aliasMatch = entry.match(/^(.+?)\s+as\s+(.+)$/);
      return aliasMatch ? aliasMatch[2].trim() : entry;
    });
}

function classifyExport(name, source) {
  if (shouldIncludeHookName(name)) {
    return 'hook';
  }

  if (source.includes('/components/') && shouldIncludeComponentName(name)) {
    return 'component';
  }

  return null;
}

function addExportsFromExportStatement(statement, section, exportsList, seen) {
  const statementMatch = statement.match(EXPORT_STATEMENT_PATTERN);
  if (!statementMatch) {
    return;
  }

  const source = statementMatch[2];
  if (!source.includes('/components/') && !source.includes('/hooks/')) {
    return;
  }

  const names = parseExportedNames(statementMatch[1]);

  for (const name of names) {
    const kind = classifyExport(name, source);
    if (!kind || seen.has(name)) {
      continue;
    }

    exportsList.push({
      kind,
      name,
      section,
      source,
    });
    seen.add(name);
  }
}

function parseExports(exportsSource) {
  const lines = exportsSource.split('\n');
  const exportsList = [];
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
        addExportsFromExportStatement(
          exportLines.join('\n'),
          exportSection,
          exportsList,
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

      addExportsFromExportStatement(
        exportLines.join('\n'),
        exportSection,
        exportsList,
        seen,
      );
      exportLines = [];
      exportSection = section;
    }
  }

  return exportsList;
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

async function resolveExportStatus(apiExport, mdxPath) {
  const exportDir = resolveComponentDirectory(apiExport.source);
  const candidates = [];

  if (mdxPath) {
    candidates.push(mdxPath);
  }

  try {
    const entries = await readdir(exportDir);
    const storyFiles = entries
      .filter((entry) => entry.includes('.stories.'))
      .toSorted((a, b) => a.localeCompare(b));

    for (const storyFile of storyFiles) {
      candidates.push(path.join(exportDir, storyFile));
    }
  } catch {
    return null;
  }

  for (const candidate of candidates) {
    const source = await readFile(candidate, 'utf8');
    const mdxMatch = source.match(STATUS_MDX_PATTERN);
    if (mdxMatch) {
      return mdxMatch[1];
    }

    const tagMatch = source.match(STATUS_TAG_PATTERN);
    if (tagMatch) {
      return tagMatch[1];
    }
  }

  return null;
}

async function buildExportResources(exportsList) {
  await Promise.all([
    rm(componentReferencesDir, { recursive: true, force: true }),
    rm(hookReferencesDir, { recursive: true, force: true }),
  ]);
  await Promise.all([
    mkdir(componentReferencesDir, { recursive: true }),
    mkdir(hookReferencesDir, { recursive: true }),
  ]);

  const resolved = [];

  for (const apiExport of exportsList) {
    const mdxPath = await resolveComponentMdxPath(apiExport);
    let docsPath = null;

    if (mdxPath) {
      const mdxSource = await readFile(mdxPath, 'utf8');
      docsPath = `${apiExport.kind === 'hook' ? 'hooks' : 'components'}/${apiExport.name}.mdx`;
      await writeFile(path.join(referencesDir, docsPath), mdxSource, 'utf8');
    }

    const status = await resolveExportStatus(apiExport, mdxPath);

    resolved.push({
      ...apiExport,
      docsPath,
      status,
    });
  }

  return resolved;
}

function renderTokensMarkdown(tokens, lightValues, darkValues, sharedValues) {
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

CSS variables provided by the Circuit UI design system and their values.

| Token | Type | Deprecated | Replacement | Light Value | Dark Value |
| --- | --- | --- | --- | --- | --- |
${tokenRows}
`;
}

function groupBySection(items) {
  const bySection = new Map();

  for (const item of items) {
    const sectionItems = bySection.get(item.section) ?? [];
    sectionItems.push(item);
    bySection.set(item.section, sectionItems);
  }

  return bySection;
}

function renderSectionTable(items, kindLabel) {
  const bySection = groupBySection(items);
  const sections = [...bySection.keys()].sort();

  return sections
    .map((section) => {
      const rows = bySection
        .get(section)
        .toSorted((a, b) => a.name.localeCompare(b.name))
        .map((item) => {
          const docsLink = item.docsPath
            ? `[Read MDX reference](${item.docsPath})`
            : 'Not available';
          const status = item.status ? `\`${item.status}\`` : 'Unknown';

          return `| \`${item.name}\` | ${status} | \`@sumup-oss/circuit-ui\` | \`${item.source}\` | ${docsLink} |`;
        })
        .join('\n');

      return `### ${section}\n\n| ${kindLabel} | Status | Package | Source export | Usage reference |\n| --- | --- | --- | --- | --- |\n${rows}`;
    })
    .join('\n\n');
}

function renderApiMarkdown(items, kindLabel, title) {
  const sections = renderSectionTable(items, kindLabel);

  return `# ${title}

${sections}
`;
}

function renderComponentsMarkdown(apiExports) {
  const components = apiExports.filter((item) => item.kind === 'component');

  return renderApiMarkdown(
    components,
    'Component',
    'Circuit UI Component References',
  );
}

function renderHooksMarkdown(apiExports) {
  const hooks = apiExports.filter((item) => item.kind === 'hook');

  return renderApiMarkdown(hooks, 'Hook', 'Circuit UI Hook References');
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
  const apiExports = parseExports(exportsSource);

  if (tokens.length === 0) {
    throw new Error(
      'No tokens were parsed from packages/design-tokens/themes/schema.ts',
    );
  }

  if (apiExports.length === 0) {
    throw new Error('No exports were parsed from packages/circuit-ui/index.ts');
  }

  await mkdir(referencesDir, { recursive: true });
  const apiExportsWithDocs = await buildExportResources(apiExports);

  await Promise.all([
    writeFile(
      path.join(referencesDir, 'design-tokens.md'),
      renderTokensMarkdown(tokens, lightValues, darkValues, sharedValues),
      'utf8',
    ),
    writeFile(
      path.join(referencesDir, 'components.md'),
      renderComponentsMarkdown(apiExportsWithDocs),
      'utf8',
    ),
    writeFile(
      path.join(referencesDir, 'hooks.md'),
      renderHooksMarkdown(apiExportsWithDocs),
      'utf8',
    ),
  ]);

  process.stdout.write(
    `Generated ${tokens.length} tokens and ${apiExports.length} API index entries in skills/circuit-ui/references.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exit(1);
});
