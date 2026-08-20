/**
 * Copyright 2026, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs, promisify } from 'node:util';

import { CATEGORIES, ICON_DIR } from '../constants.js';
import manifest from '../manifest.json' with { type: 'json' };

import {
  DEFAULT_FIGMA_FILE_KEY,
  DEFAULT_FIGMA_NODE_ID,
  DEFAULT_FIGMA_URL,
  ICON_SIZES,
  type IconChangeset,
  type IconLock,
  type IconSize,
  type ImportedIcon,
  LOCK_FILE_NAME,
  type ManifestIcon,
  type SyncCandidate,
  buildChangeset,
  buildLock,
  buildPullRequestBody,
  emptyLock,
  iconFileName,
  inferCategory,
  isOnPixelGrid,
  lintImportedSvg,
  lockKey,
  parseFigmaUrl,
  parseSizeFromName,
  resolvePublishedIcon,
  selectSyncTargets,
  toSnakeName,
  upsertManifestIcon,
} from './icon-import.js';

const execFileAsync = promisify(execFile);
const FIGMA_API = 'https://api.figma.com/v1';
const IMAGE_BATCH_SIZE = 40;
const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..',
);
const SVGO_BIN = path.join(REPO_ROOT, 'node_modules/svgo/bin/svgo.js');
const SVGO_CONFIG = path.join(REPO_ROOT, 'svgo.config.js');
const CHANGESET_DIR = path.join(REPO_ROOT, '.changeset');
const IMPORT_GIT_PATHS = [
  'packages/icons/web/v2',
  'packages/icons/manifest.json',
  `packages/icons/${LOCK_FILE_NAME}`,
];

type CliOptions = {
  url?: string;
  name?: string;
  sync: boolean;
  include: string;
  limit?: string;
  list: boolean;
  sizes?: string;
  category?: string;
  fileKey?: string;
  dryRun: boolean;
  skipManifest: boolean;
  skipChangeset: boolean;
  pr: boolean;
  force: boolean;
  help: boolean;
};

type FigmaContainingFrame = {
  name?: string;
  pageName?: string;
  containingStateGroup?: { name?: string; nodeId?: string };
};

type FigmaPublishedComponent = {
  node_id: string;
  name: string;
  updated_at?: string;
  containing_frame?: FigmaContainingFrame;
};

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number };
  children?: FigmaNode[];
};

type ImportTarget = {
  nodeId: string;
  name: string;
  size: IconSize;
  category?: (typeof CATEGORIES)[number];
  x?: number;
  y?: number;
};

const USAGE = `Import icons from Circuit UI Foundation into packages/icons/web/v2.

Requires FIGMA_ACCESS_TOKEN with access to:
  ${DEFAULT_FIGMA_URL}

Usage:
  npm run import:figma -- --sync --list
  npm run import:figma -- --sync
  npm run import:figma -- --name add_items --sizes 16,24 --category Action
  npm run import:figma -- --sync --pr

Options:
  --url             Override the icon library node (defaults to Circuit UI Foundation icons)
  --name            Repo icon name, e.g. add_items
  --sync            Diff that Figma node against the repo and import only what is missing
  --include         With --sync: new (default), changed (new + edited), or all
  --limit           With --sync: import at most N icons in this run
  --list            With --sync: print the diff without exporting anything
  --sizes           Comma-separated sizes (16,24,32). Default: every matching size
  --category        Manifest category. Inferred from the Figma frame when possible
  --file-key        Override the Figma file key
  --dry-run         Resolve, export, and lint without writing files
  --skip-manifest   Do not update manifest.json
  --skip-changeset  Do not write a Changeset file
  --pr              Commit the import, push, and open a GitHub pull request
  --force           Allow clip-path / hardcoded color issues (size and pixel-grid still fail)
  -h, --help        Show this help

--sync only looks at the icons node in Circuit UI Foundation, not the rest of that file.
It tracks the last imported Figma revision in packages/icons/${LOCK_FILE_NAME}.
The first run only seeds that file; later runs can detect edited icons via --include changed.
`;

function getAccessToken(): string {
  const token = process.env.FIGMA_ACCESS_TOKEN ?? process.env.FIGMA_TOKEN;
  if (!token) {
    throw new Error(
      'Missing FIGMA_ACCESS_TOKEN. Create a Figma personal access token with file access and export it in your shell.',
    );
  }
  return token;
}

async function figmaGet<T>(token: string, resourcePath: string): Promise<T> {
  const response = await fetch(`${FIGMA_API}${resourcePath}`, {
    headers: { 'X-Figma-Token': token },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Figma API ${response.status} ${resourcePath}: ${body}`);
  }
  return JSON.parse(body) as T;
}

function asComponentList(value: unknown): FigmaPublishedComponent[] {
  if (Array.isArray(value)) {
    return value as FigmaPublishedComponent[];
  }
  if (value && typeof value === 'object') {
    return Object.values(value) as FigmaPublishedComponent[];
  }
  return [];
}

function parseSizes(raw?: string): IconSize[] | undefined {
  if (!raw) {
    return undefined;
  }
  const sizes = raw.split(',').map((size) => size.trim());
  const invalid = sizes.filter(
    (size) => !(ICON_SIZES as readonly string[]).includes(size),
  );
  if (invalid.length > 0) {
    throw new Error(
      `Unsupported size(s): ${invalid.join(', ')}. Use ${ICON_SIZES.join(', ')}.`,
    );
  }
  return sizes as IconSize[];
}

function parseCategory(raw?: string): (typeof CATEGORIES)[number] | undefined {
  if (!raw) {
    return undefined;
  }
  const match = inferCategory(raw);
  if (!match) {
    throw new Error(
      `Unknown category "${raw}". Use one of: ${CATEGORIES.join(', ')}.`,
    );
  }
  return match;
}

function sizeFromNode(node: FigmaNode): IconSize | undefined {
  const fromName = parseSizeFromName(node.name);
  if (fromName && (ICON_SIZES as readonly string[]).includes(fromName)) {
    return fromName as IconSize;
  }
  const box = node.absoluteBoundingBox;
  if (!box) {
    return undefined;
  }
  const width = Math.round(box.width);
  const height = Math.round(box.height);
  if (width === 16 && height === 16) {
    return '16';
  }
  if (width === 24 && height === 24) {
    return '24';
  }
  if (width === 32 && (height === 24 || height === 32)) {
    return '32';
  }
  return undefined;
}

function collectExportNodes(
  node: FigmaNode,
  componentSetName?: string,
): Array<{ node: FigmaNode; componentSetName?: string }> {
  if (node.type === 'COMPONENT_SET') {
    return (node.children ?? [])
      .filter((child) => child.type === 'COMPONENT')
      .map((child) => ({ node: child, componentSetName: node.name }));
  }
  if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    return [{ node, componentSetName }];
  }
  return (node.children ?? []).flatMap((child) =>
    collectExportNodes(child, componentSetName),
  );
}

function isOnGrid(target: ImportTarget): boolean {
  if (target.x === undefined || target.y === undefined) {
    return true;
  }
  return isOnPixelGrid(target.x, target.y);
}

async function fetchNodes(
  token: string,
  fileKey: string,
  nodeIds: string[],
): Promise<Map<string, FigmaNode>> {
  const nodes = new Map<string, FigmaNode>();

  for (let index = 0; index < nodeIds.length; index += IMAGE_BATCH_SIZE) {
    const batch = nodeIds.slice(index, index + IMAGE_BATCH_SIZE);
    const data = await figmaGet<{
      nodes: Record<string, { document: FigmaNode } | null>;
    }>(
      token,
      `/files/${fileKey}/nodes?ids=${encodeURIComponent(batch.join(','))}`,
    );

    for (const [id, entry] of Object.entries(data.nodes)) {
      if (entry?.document) {
        nodes.set(id, entry.document);
      }
    }
  }

  return nodes;
}

async function fetchSvgMap(
  token: string,
  fileKey: string,
  nodeIds: string[],
): Promise<Map<string, string>> {
  const svgs = new Map<string, string>();

  for (let index = 0; index < nodeIds.length; index += IMAGE_BATCH_SIZE) {
    const batch = nodeIds.slice(index, index + IMAGE_BATCH_SIZE);
    const data = await figmaGet<{
      err: string | null;
      images: Record<string, string | null>;
    }>(
      token,
      `/images/${fileKey}?ids=${encodeURIComponent(batch.join(','))}&format=svg`,
    );

    if (data.err) {
      throw new Error(`Figma image export failed: ${data.err}`);
    }

    for (const [id, url] of Object.entries(data.images)) {
      if (!url) {
        throw new Error(`Figma did not return an SVG URL for node ${id}.`);
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to download SVG for node ${id}: ${response.status}`,
        );
      }
      svgs.set(id, await response.text());
    }
  }

  return svgs;
}

async function optimizeSvg(svg: string, fileName: string): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'circuit-icon-import-'));
  const filePath = path.join(dir, fileName);
  await fs.writeFile(filePath, svg);
  await execFileAsync(process.execPath, [
    SVGO_BIN,
    '--config',
    SVGO_CONFIG,
    '--pretty',
    filePath,
  ]);
  return fs.readFile(filePath, 'utf8');
}

async function loadPublishedComponents(
  token: string,
  fileKey: string,
): Promise<FigmaPublishedComponent[]> {
  const data = await figmaGet<{
    meta: { components: unknown };
  }>(token, `/files/${fileKey}/components`);
  return asComponentList(data.meta.components);
}

function targetsFromNode(
  node: FigmaNode,
  options: {
    name?: string;
    sizes?: IconSize[];
    category?: (typeof CATEGORIES)[number];
  },
): ImportTarget[] {
  return collectExportNodes(node).flatMap(
    ({ node: exportNode, componentSetName }) => {
      const resolved = resolvePublishedIcon({
        name: exportNode.name,
        componentSetName,
      });
      const size = sizeFromNode(exportNode) ?? resolved.size;
      if (!size || !(ICON_SIZES as readonly string[]).includes(size)) {
        return [];
      }
      const typedSize = size as IconSize;
      if (options.sizes && !options.sizes.includes(typedSize)) {
        return [];
      }
      if (options.name && resolved.name !== options.name) {
        return [];
      }
      return [
        {
          nodeId: exportNode.id,
          name: options.name ?? resolved.name,
          size: typedSize,
          category: options.category,
          x: exportNode.absoluteBoundingBox?.x,
          y: exportNode.absoluteBoundingBox?.y,
        } satisfies ImportTarget,
      ];
    },
  );
}

function candidatesFromNode(
  node: FigmaNode,
  options: {
    sizes?: IconSize[];
    category?: (typeof CATEGORIES)[number];
    manifestCategories: Map<string, (typeof CATEGORIES)[number]>;
  },
): SyncCandidate[] {
  const unique = new Map<string, SyncCandidate>();

  for (const target of targetsFromNode(node, {
    sizes: options.sizes,
    category: options.category,
  })) {
    unique.set(lockKey(target.name, target.size), {
      nodeId: target.nodeId,
      name: target.name,
      size: target.size,
      category: target.category ?? options.manifestCategories.get(target.name),
    });
  }

  return [...unique.values()];
}

async function loadLibraryRoot(
  token: string,
  fileKey: string,
  nodeId: string,
): Promise<FigmaNode> {
  const nodes = await fetchNodes(token, fileKey, [nodeId]);
  const node = nodes.get(nodeId);
  if (!node) {
    throw new Error(`Figma node ${nodeId} was not found in file ${fileKey}.`);
  }
  return node;
}

async function withPublishedTimestamps(
  token: string,
  fileKey: string,
  candidates: SyncCandidate[],
): Promise<SyncCandidate[]> {
  try {
    const published = await loadPublishedComponents(token, fileKey);
    const updatedAt = new Map(
      published.map((component) => [
        component.node_id.replace(/-/g, ':'),
        component.updated_at,
      ]),
    );
    return candidates.map((candidate) => ({
      ...candidate,
      updatedAt: updatedAt.get(candidate.nodeId) ?? candidate.updatedAt,
    }));
  } catch {
    return candidates;
  }
}

function manifestCategoriesByName(
  icons: ManifestIcon[],
): Map<string, (typeof CATEGORIES)[number]> {
  const categories = new Map<string, (typeof CATEGORIES)[number]>();
  for (const icon of icons) {
    if (!categories.has(icon.name)) {
      categories.set(icon.name, icon.category);
    }
  }
  return categories;
}

function deprecatedKeys(icons: ManifestIcon[]): Set<string> {
  return new Set(
    icons
      .filter((icon) => icon.deprecation)
      .map((icon) => lockKey(icon.name, icon.size)),
  );
}

async function readExistingIcons(): Promise<Set<string>> {
  const files = await fs.readdir(ICON_DIR);
  return new Set(files.filter((file) => file.endsWith('.svg')));
}

async function readLock(fileKey: string): Promise<IconLock> {
  try {
    const raw = await fs.readFile(lockPath(), 'utf8');
    const parsed = JSON.parse(raw) as IconLock;
    return parsed.fileKey === fileKey ? parsed : emptyLock(fileKey);
  } catch {
    return emptyLock(fileKey);
  }
}

function lockPath(): string {
  return path.join(ICON_DIR, '../..', LOCK_FILE_NAME);
}

async function writeLock(lock: IconLock): Promise<void> {
  await fs.writeFile(lockPath(), `${JSON.stringify(lock, null, 2)}\n`);
}

async function writeManifest(icons: ManifestIcon[]): Promise<void> {
  const manifestPath = path.join(ICON_DIR, '../../manifest.json');
  const next = `${JSON.stringify({ icons }, null, 2)}\n`;
  await fs.writeFile(manifestPath, next);
}

async function writeChangeset(icons: ImportedIcon[]): Promise<{
  filePath: string;
  changeset: IconChangeset;
}> {
  const changeset = buildChangeset(icons);
  const fileName = `figma-icons-${randomBytes(4).toString('hex')}.md`;
  const filePath = path.join(CHANGESET_DIR, fileName);
  await fs.mkdir(CHANGESET_DIR, { recursive: true });
  await fs.writeFile(filePath, changeset.markdown);
  process.stdout.write(
    `Wrote changeset ${path.relative(REPO_ROOT, filePath)}\n`,
  );
  return { filePath, changeset };
}

async function runGit(args: string[]): Promise<string> {
  try {
    const { stdout } = await execFileAsync('git', args, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });
    return stdout.trim();
  } catch (error) {
    const err = error as { stderr?: string; message: string };
    throw new Error(err.stderr?.trim() || err.message, { cause: error });
  }
}

async function changesetFiles(): Promise<string[]> {
  const files = await fs.readdir(CHANGESET_DIR);
  return files
    .filter((file) => file.startsWith('figma-icons-') && file.endsWith('.md'))
    .map((file) => path.join('.changeset', file));
}

async function openPullRequest(changeset?: IconChangeset): Promise<void> {
  const extraFiles = await changesetFiles();
  const paths = [...IMPORT_GIT_PATHS, ...extraFiles];
  const status = await runGit(['status', '--porcelain', '--', ...paths]);

  if (!status) {
    process.stdout.write('No icon changes to open a pull request for.\n');
    return;
  }

  const title = changeset?.title ?? 'Add icons from the Figma library';
  const body = changeset
    ? buildPullRequestBody(changeset)
    : 'Imported from the SumUp Figma iconography library.';
  const currentBranch = await runGit(['rev-parse', '--abbrev-ref', 'HEAD']);
  const date = new Date().toISOString().slice(0, 10);
  const branch =
    currentBranch === 'HEAD' ||
    currentBranch === 'main' ||
    currentBranch === 'master'
      ? `chore/icons-from-figma-${date}`
      : currentBranch;

  if (branch !== currentBranch) {
    await runGit(['checkout', '-B', branch]);
  }

  await runGit(['add', '--', ...paths]);
  const staged = await runGit(['diff', '--cached', '--name-only']);
  if (!staged) {
    process.stdout.write('No icon changes to open a pull request for.\n');
    return;
  }

  try {
    await runGit(['commit', '-m', title]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/nothing to commit/i.test(message)) {
      throw error;
    }
  }

  await runGit(['push', '-u', 'origin', 'HEAD']);

  try {
    const { stdout } = await execFileAsync(
      'gh',
      ['pr', 'create', '--title', title, '--body', body],
      { cwd: REPO_ROOT, encoding: 'utf8' },
    );
    process.stdout.write(stdout);
  } catch (error) {
    const err = error as { stderr?: string };
    if (/already exists/i.test(err.stderr ?? '')) {
      const { stdout } = await execFileAsync(
        'gh',
        ['pr', 'view', '--json', 'url', '--jq', '.url'],
        { cwd: REPO_ROOT, encoding: 'utf8' },
      );
      process.stdout.write(`Pull request already exists: ${stdout.trim()}\n`);
      return;
    }
    throw new Error(
      err.stderr?.trim() ||
        'Failed to open a pull request. Install the GitHub CLI (`gh`) and authenticate with `gh auth login`.',
      { cause: error },
    );
  }
}

function parseInclude(raw: string): 'new' | 'changed' | 'all' {
  if (raw === 'new' || raw === 'changed' || raw === 'all') {
    return raw;
  }
  throw new Error(
    `Unknown --include value "${raw}". Use new, changed, or all.`,
  );
}

function parseLimit(raw?: string): number | undefined {
  if (raw === undefined) {
    return undefined;
  }
  const limit = Number(raw);
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error(`--limit must be a positive integer, got "${raw}".`);
  }
  return limit;
}

async function resolveTargets(
  token: string,
  fileKey: string,
  context: {
    sizes?: IconSize[];
    category?: (typeof CATEGORIES)[number];
    requestedName?: string;
    fromUrl?: ReturnType<typeof parseFigmaUrl>;
  },
): Promise<ImportTarget[]> {
  const { fromUrl, requestedName, sizes, category } = context;
  const nodeId = fromUrl?.nodeId ?? DEFAULT_FIGMA_NODE_ID;
  const node = await loadLibraryRoot(token, fileKey, nodeId);

  return targetsFromNode(node, {
    name: requestedName,
    sizes,
    category,
  });
}

async function withBoundingBoxes(
  token: string,
  fileKey: string,
  targets: ImportTarget[],
): Promise<ImportTarget[]> {
  const nodes = await fetchNodes(
    token,
    fileKey,
    targets.map((target) => target.nodeId),
  );
  return targets.map((target) => {
    const node = nodes.get(target.nodeId);
    return {
      ...target,
      x: node?.absoluteBoundingBox?.x,
      y: node?.absoluteBoundingBox?.y,
    };
  });
}

type ImportOutcome = {
  fileName: string;
  svg: string;
  category?: (typeof CATEGORIES)[number];
  name: string;
  size: IconSize;
};

async function prepareIcon(
  target: ImportTarget,
  rawSvg: string,
  options: CliOptions,
): Promise<ImportOutcome> {
  const fileName = iconFileName(target.name, target.size);
  const optimized = await optimizeSvg(rawSvg, fileName);
  const blockingCodes = options.force
    ? new Set(['size', 'viewBox', 'xml'])
    : undefined;
  const issues = lintImportedSvg(optimized, {
    size: target.size,
    category: target.category,
    allowClipPath: options.force,
  }).filter((issue) => !blockingCodes || blockingCodes.has(issue.code));

  if (issues.length > 0) {
    const details = issues
      .map((issue) => `  - [${issue.code}] ${issue.message}`)
      .join('\n');
    throw new Error(`Rejected ${fileName}:\n${details}`);
  }

  if (!target.category && !options.skipManifest) {
    throw new Error(
      `Could not infer a category for ${fileName}. Pass --category (${CATEGORIES.join(', ')}).`,
    );
  }

  return {
    fileName,
    svg: optimized,
    category: target.category,
    name: target.name,
    size: target.size,
  };
}

export async function runImport(options: CliOptions): Promise<void> {
  const hasSelector = Boolean(
    options.url || options.name || options.sync || options.pr,
  );

  if (options.help || !hasSelector) {
    process.stdout.write(USAGE);
    if (!options.help) {
      throw new Error('Provide --url, --name, --sync, or --pr.');
    }
    return;
  }

  if (options.pr && options.dryRun) {
    throw new Error('--pr cannot be combined with --dry-run.');
  }

  if (options.pr && !options.url && !options.name && !options.sync) {
    await openPullRequest();
    return;
  }

  const token = getAccessToken();
  const sizes = parseSizes(options.sizes);
  const category = parseCategory(options.category);
  const include = parseInclude(options.include);
  const limit = parseLimit(options.limit);
  const fromUrl = options.url ? parseFigmaUrl(options.url) : undefined;
  const fileKey = options.fileKey ?? fromUrl?.fileKey ?? DEFAULT_FIGMA_FILE_KEY;
  const libraryNodeId = fromUrl?.nodeId ?? DEFAULT_FIGMA_NODE_ID;
  const requestedName = options.name ? toSnakeName(options.name) : undefined;

  let icons = manifest.icons as ManifestIcon[];
  let targets: ImportTarget[] = [];
  let candidates: SyncCandidate[] = [];
  let lock: IconLock | undefined;
  let existing = await readExistingIcons();

  if (options.sync) {
    lock = await readLock(fileKey);
    const root = await loadLibraryRoot(token, fileKey, libraryNodeId);
    candidates = await withPublishedTimestamps(
      token,
      fileKey,
      candidatesFromNode(root, {
        sizes,
        category,
        manifestCategories: manifestCategoriesByName(icons),
      }),
    );

    const selection = selectSyncTargets(candidates, {
      existing,
      lock,
      deprecated: deprecatedKeys(icons),
      include,
      limit,
    });

    process.stdout.write(
      `Published icon variants: ${candidates.length} (new ${selection.counts.new}, changed ${selection.counts.changed}, unchanged ${selection.counts.unchanged}, deprecated ${selection.counts.deprecated})\n`,
    );

    if (selection.truncated) {
      process.stdout.write(`Limited to ${limit} icon(s) this run.\n`);
    }

    if (options.list) {
      for (const target of selection.targets) {
        process.stdout.write(
          `${target.decision.padEnd(8)} ${iconFileName(target.name, target.size)} ← ${target.nodeId}\n`,
        );
      }
      if (selection.targets.length === 0) {
        process.stdout.write('Nothing to import.\n');
      }
      return;
    }

    targets = await withBoundingBoxes(
      token,
      fileKey,
      selection.targets.map((target) => ({
        nodeId: target.nodeId,
        name: target.name,
        size: target.size,
        category: target.category,
      })),
    );
  } else {
    targets = await resolveTargets(token, fileKey, {
      sizes,
      category,
      requestedName,
      fromUrl,
    });
  }

  if (targets.length === 0) {
    if (options.sync) {
      process.stdout.write('Nothing to import.\n');
      return;
    }
    throw new Error(
      'No matching icon variants found. Check the name/size, or pass a node URL to the icon group (not a page frame).',
    );
  }

  const svgs = await fetchSvgMap(
    token,
    fileKey,
    targets.map((target) => target.nodeId),
  );

  const written: string[] = [];
  const imported: ImportedIcon[] = [];
  const failures: string[] = [];

  for (const target of targets) {
    const rawSvg = svgs.get(target.nodeId);
    if (!rawSvg) {
      throw new Error(`Missing SVG for ${target.nodeId}.`);
    }

    if (!isOnGrid(target)) {
      const message = `${iconFileName(target.name, target.size)} is off the pixel grid (x=${target.x}, y=${target.y}). Copy the icon onto the grid in Figma and re-run.`;
      if (!options.sync) {
        throw new Error(message);
      }
      failures.push(message);
      continue;
    }

    let outcome: ImportOutcome;
    try {
      outcome = await prepareIcon(target, rawSvg, options);
    } catch (error) {
      if (!options.sync) {
        throw error;
      }
      failures.push(error instanceof Error ? error.message : String(error));
      continue;
    }

    process.stdout.write(
      `${options.dryRun ? 'Would import' : 'Importing'} ${outcome.fileName} ← ${target.nodeId}\n`,
    );

    if (!options.dryRun) {
      const added = !existing.has(outcome.fileName);
      await fs.writeFile(path.join(ICON_DIR, outcome.fileName), outcome.svg);
      written.push(outcome.fileName);
      imported.push({
        name: outcome.name,
        size: outcome.size,
        added,
      });
      existing.add(outcome.fileName);
      if (!options.skipManifest && outcome.category) {
        icons = upsertManifestIcon(icons, {
          name: outcome.name,
          size: outcome.size,
          category: outcome.category,
        });
      }
    }
  }

  if (!options.dryRun && !options.skipManifest && written.length > 0) {
    await writeManifest(icons);
    process.stdout.write(`Updated manifest.json (${written.length} icon(s))\n`);
  }

  if (options.sync && !options.dryRun) {
    existing = await readExistingIcons();
    await writeLock(buildLock(fileKey, candidates, existing, lock));
    process.stdout.write(`Updated ${LOCK_FILE_NAME}\n`);
  }

  let changeset: IconChangeset | undefined;
  if (!options.dryRun && !options.skipChangeset && imported.length > 0) {
    changeset = (await writeChangeset(imported)).changeset;
  }

  if (options.pr) {
    if (imported.length > 0) {
      await openPullRequest(changeset);
    } else {
      process.stdout.write('No icons imported; skipping pull request.\n');
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Skipped ${failures.length} icon(s):\n${failures.map((failure) => `- ${failure}`).join('\n')}`,
    );
  }
}

function parseCli(argv: string[]): CliOptions {
  const { values } = parseArgs({
    args: argv,
    options: {
      url: { type: 'string' },
      name: { type: 'string' },
      sync: { type: 'boolean', default: false },
      include: { type: 'string', default: 'new' },
      limit: { type: 'string' },
      list: { type: 'boolean', default: false },
      sizes: { type: 'string' },
      category: { type: 'string' },
      'file-key': { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      'skip-manifest': { type: 'boolean', default: false },
      'skip-changeset': { type: 'boolean', default: false },
      pr: { type: 'boolean', default: false },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  return {
    url: values.url,
    name: values.name,
    sync: Boolean(values.sync),
    include: values.include ?? 'new',
    limit: values.limit,
    list: Boolean(values.list),
    sizes: values.sizes,
    category: values.category,
    fileKey: values['file-key'],
    dryRun: Boolean(values['dry-run']),
    skipManifest: Boolean(values['skip-manifest']),
    skipChangeset: Boolean(values['skip-changeset']),
    pr: Boolean(values.pr),
    force: Boolean(values.force),
    help: Boolean(values.help),
  };
}

async function main(): Promise<void> {
  try {
    await runImport(parseCli(process.argv.slice(2)));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}

const isCli =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli) {
  void main();
}
