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

import { CATEGORIES, SIZES } from '../constants.js';

export const DEFAULT_FIGMA_FILE_KEY = 'OgPQeoNZ2QoY7hZvy0ybk2';
export const DEFAULT_FIGMA_NODE_ID = '5700:12762';
export const DEFAULT_FIGMA_URL = `https://www.figma.com/design/${DEFAULT_FIGMA_FILE_KEY}/Circuit-UI-Foundation?node-id=5700-12762`;

export const ICON_SIZES = ['16', '24', '32'] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export const COLOR_PRESERVING_CATEGORIES = new Set<(typeof CATEGORIES)[number]>(
  ['Brand', 'Card scheme', 'Payment method', 'Country flag', 'Flag'],
);

export type ManifestIcon = {
  name: string;
  category: (typeof CATEGORIES)[number];
  size: (typeof SIZES)[number];
  keywords?: string[];
  alternative?: string[];
  deprecation?: string;
  skipComponentFile?: boolean;
};

export type FigmaFileRef = {
  fileKey: string;
  nodeId?: string;
};

export type SvgIssue = {
  code: 'clip-path' | 'color' | 'size' | 'viewBox' | 'xml';
  message: string;
};

const SIZE_TOKEN = '(16|24|32|480)';

export function parseFigmaUrl(url: string): FigmaFileRef {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (error) {
    throw new Error(`Invalid Figma URL: ${url}`, { cause: error });
  }

  const parts = parsed.pathname.split('/').filter(Boolean);
  const kindIndex = parts.findIndex(
    (part) => part === 'design' || part === 'file',
  );

  if (kindIndex === -1 || !parts[kindIndex + 1]) {
    throw new Error(
      `Could not parse a Figma file key from URL: ${url}. Expected a /design/ or /file/ link.`,
    );
  }

  const fileKey =
    parts[kindIndex + 2] === 'branch' && parts[kindIndex + 3]
      ? parts[kindIndex + 3]
      : parts[kindIndex + 1];

  const nodeParam = parsed.searchParams.get('node-id');

  return {
    fileKey,
    nodeId: nodeParam ? nodeParam.replace(/-/g, ':') : undefined,
  };
}

export function toSnakeName(raw: string): string {
  let value = raw.trim();
  value = value.replace(
    new RegExp(`\\bsize\\s*=\\s*${SIZE_TOKEN}\\b`, 'gi'),
    '',
  );
  value = value.replace(new RegExp(`[/_,\\s]+${SIZE_TOKEN}\\s*$`, 'i'), '');
  value = value.replace(new RegExp(`_${SIZE_TOKEN}$`, 'i'), '');

  return value
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

export function parseSizeFromName(
  raw: string,
): (typeof SIZES)[number] | undefined {
  const match = raw.match(
    new RegExp(`(?:^|[=\\s/_-])${SIZE_TOKEN}(?:$|[=,\\s/_-])`),
  );
  const size = match?.[1];
  return size && (SIZES as readonly string[]).includes(size)
    ? (size as (typeof SIZES)[number])
    : undefined;
}

export function iconFileName(name: string, size: string): string {
  return `${name}_${size}.svg`;
}

export function isOnPixelGrid(x: number, y: number, epsilon = 0.02): boolean {
  return (
    Math.abs(x - Math.round(x)) < epsilon &&
    Math.abs(y - Math.round(y)) < epsilon
  );
}

export function parseSvgRootAttributes(svg: string): {
  width?: string;
  height?: string;
  viewBox?: string;
} {
  const tag = svg.match(/<svg\b[^>]*>/i)?.[0];
  if (!tag) {
    return {};
  }

  const attr = (name: string) =>
    tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];

  return {
    width: attr('width'),
    height: attr('height'),
    viewBox: attr('viewBox'),
  };
}

export function expectedDimensions(
  size: string,
  category?: (typeof CATEGORIES)[number],
): { width: string[]; height: string[] } {
  if (category === 'Flag') {
    return { width: ['640'], height: ['480'] };
  }
  if (size === '32') {
    return { width: ['32'], height: ['24', '32'] };
  }
  return { width: [size], height: [size] };
}

export function lintImportedSvg(
  svg: string,
  options: {
    size: string;
    category?: (typeof CATEGORIES)[number];
    allowClipPath?: boolean;
  },
): SvgIssue[] {
  const issues: SvgIssue[] = [];

  if (!/<svg\b/i.test(svg)) {
    issues.push({
      code: 'xml',
      message: 'File is not an SVG document.',
    });
    return issues;
  }

  const { width, height, viewBox } = parseSvgRootAttributes(svg);
  const expected = expectedDimensions(options.size, options.category);

  if (!width || !expected.width.includes(width.replace(/px$/, ''))) {
    issues.push({
      code: 'size',
      message: `Expected width ${expected.width.join(' or ')} for size ${options.size}, got ${width ?? '(missing)'}. Export the icon group, not a surrounding frame.`,
    });
  }

  if (!height || !expected.height.includes(height.replace(/px$/, ''))) {
    issues.push({
      code: 'size',
      message: `Expected height ${expected.height.join(' or ')} for size ${options.size}, got ${height ?? '(missing)'}. This often means the layer is off-grid in Figma.`,
    });
  }

  if (width && height) {
    const normalizedWidth = width.replace(/px$/, '');
    const normalizedHeight = height.replace(/px$/, '');
    const expectedViewBox = `0 0 ${normalizedWidth} ${normalizedHeight}`;
    if (
      viewBox &&
      viewBox.replace(/,/g, ' ').replace(/\s+/g, ' ').trim() !== expectedViewBox
    ) {
      issues.push({
        code: 'viewBox',
        message: `Expected viewBox="${expectedViewBox}", got "${viewBox}".`,
      });
    }
  }

  if (!options.allowClipPath && /clip-path=|<clipPath\b/i.test(svg)) {
    issues.push({
      code: 'clip-path',
      message:
        'SVG contains a clip-path. Re-place the icon on the pixel grid in Figma and export the icon group again.',
    });
  }

  const preserveColor =
    options.category && COLOR_PRESERVING_CATEGORIES.has(options.category);

  if (!preserveColor) {
    const colorAttrs = [
      ...svg.matchAll(
        /\b(?:fill|stroke)="(#[0-9a-f]{3,8}|rgb[a]?\([^)]+\))"/gi,
      ),
    ].map((match) => match[1].toLowerCase());

    const unexpected = colorAttrs.filter(
      (value) => value !== '#fff' && value !== '#ffffff' && value !== '#0f131a',
    );

    if (unexpected.length > 0) {
      issues.push({
        code: 'color',
        message: `Found hardcoded fill/stroke (${unexpected.slice(0, 3).join(', ')}). Monochrome icons should use currentColor (SVGO converts #0F131A). Brand logos are exempt — pass --category Brand (or Card scheme / Payment method).`,
      });
    }
  }

  return issues;
}

export function inferCategory(
  ...candidates: Array<string | undefined>
): (typeof CATEGORIES)[number] | undefined {
  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }
    const match = CATEGORIES.find(
      (category) => category.toLowerCase() === candidate.toLowerCase(),
    );
    if (match) {
      return match;
    }
  }
  return undefined;
}

export function sortManifestIcons(icons: ManifestIcon[]): ManifestIcon[] {
  return [...icons].sort((a, b) => {
    const category = a.category.localeCompare(b.category);
    if (category !== 0) {
      return category;
    }
    const name = a.name.localeCompare(b.name);
    if (name !== 0) {
      return name;
    }
    return Number(b.size) - Number(a.size);
  });
}

export function upsertManifestIcon(
  icons: ManifestIcon[],
  entry: ManifestIcon,
): ManifestIcon[] {
  const existing = icons.find(
    (icon) => icon.name === entry.name && icon.size === entry.size,
  );
  const merged: ManifestIcon = existing
    ? {
        ...existing,
        category: entry.category,
      }
    : entry;

  return sortManifestIcons([
    ...icons.filter(
      (icon) => !(icon.name === entry.name && icon.size === entry.size),
    ),
    merged,
  ]);
}

export function resolvePublishedIcon(component: {
  name: string;
  componentSetName?: string;
}): { name: string; size?: (typeof SIZES)[number] } {
  const sourceName = component.componentSetName || component.name;
  return {
    name: toSnakeName(sourceName),
    size: parseSizeFromName(component.name) ?? parseSizeFromName(sourceName),
  };
}

export const LOCK_FILE_NAME = 'figma-lock.json';

export type LockEntry = {
  nodeId: string;
  updatedAt?: string;
};

export type IconLock = {
  fileKey: string;
  icons: Record<string, LockEntry>;
};

export type SyncCandidate = {
  nodeId: string;
  name: string;
  size: IconSize;
  category?: (typeof CATEGORIES)[number];
  updatedAt?: string;
};

export type SyncDecision = 'new' | 'changed' | 'unchanged' | 'deprecated';

export type SyncSelection = {
  targets: Array<SyncCandidate & { decision: SyncDecision }>;
  counts: Record<SyncDecision, number>;
  truncated: boolean;
};

export function lockKey(name: string, size: string): string {
  return `${name}_${size}`;
}

export function emptyLock(fileKey: string): IconLock {
  return { fileKey, icons: {} };
}

/**
 * A candidate is "new" when no SVG exists yet, and "changed" when Figma reports
 * a newer `updated_at` than the last import recorded in the lock file. Icons
 * that exist on disk but aren't in the lock file are treated as unchanged so
 * that the first sync seeds the lock instead of re-importing the whole library.
 */
export function classifyCandidate(
  candidate: SyncCandidate,
  options: {
    existing: ReadonlySet<string>;
    lock?: IconLock;
    deprecated?: ReadonlySet<string>;
  },
): SyncDecision {
  const key = lockKey(candidate.name, candidate.size);

  if (options.deprecated?.has(key)) {
    return 'deprecated';
  }

  if (!options.existing.has(iconFileName(candidate.name, candidate.size))) {
    return 'new';
  }

  const entry = options.lock?.icons[key];

  if (entry && candidate.updatedAt && entry.updatedAt !== candidate.updatedAt) {
    return 'changed';
  }

  return 'unchanged';
}

function isIncluded(
  decision: SyncDecision,
  include: 'new' | 'changed' | 'all',
): boolean {
  if (decision === 'deprecated') {
    return false;
  }
  if (include === 'all') {
    return true;
  }
  if (include === 'changed') {
    return decision === 'new' || decision === 'changed';
  }
  return decision === 'new';
}

export function selectSyncTargets(
  candidates: SyncCandidate[],
  options: {
    existing: ReadonlySet<string>;
    lock?: IconLock;
    deprecated?: ReadonlySet<string>;
    include: 'new' | 'changed' | 'all';
    limit?: number;
  },
): SyncSelection {
  const counts: Record<SyncDecision, number> = {
    new: 0,
    changed: 0,
    unchanged: 0,
    deprecated: 0,
  };
  const matched: Array<SyncCandidate & { decision: SyncDecision }> = [];

  for (const candidate of candidates) {
    const decision = classifyCandidate(candidate, options);
    counts[decision] += 1;

    if (isIncluded(decision, options.include)) {
      matched.push({ ...candidate, decision });
    }
  }

  matched.sort(
    (a, b) => a.name.localeCompare(b.name) || Number(b.size) - Number(a.size),
  );

  const limited =
    options.limit === undefined ? matched : matched.slice(0, options.limit);

  return {
    targets: limited,
    counts,
    truncated: limited.length < matched.length,
  };
}

export function toComponentName(name: string): string {
  return name
    .split(/[^a-z0-9]/i)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

export type ImportedIcon = {
  name: string;
  size: string;
  added: boolean;
};

export type IconChangeset = {
  bump: 'minor' | 'patch';
  title: string;
  summary: string;
  markdown: string;
};

function formatSizeList(sizes: string[]): string {
  const unique = [...new Set(sizes)].sort(
    (a, b) => Number(b) - Number(a) || a.localeCompare(b),
  );
  if (unique.length === 1) {
    return `size ${unique[0]}`;
  }
  if (unique.length === 2) {
    return `sizes ${unique[0]} and ${unique[1]}`;
  }
  return `sizes ${unique.slice(0, -1).join(', ')}, and ${unique.at(-1)}`;
}

function formatIconGroup(verb: string, icons: ImportedIcon[]): string {
  if (icons.length === 0) {
    return '';
  }

  const sizesByName = new Map<string, string[]>();
  for (const icon of icons) {
    const sizes = sizesByName.get(icon.name) ?? [];
    sizes.push(icon.size);
    sizesByName.set(icon.name, sizes);
  }

  const parts = [...sizesByName.entries()].map(
    ([name, sizes]) =>
      `\`${toComponentName(name)}\` in ${formatSizeList(sizes)}`,
  );

  if (parts.length === 1) {
    return `${verb} ${parts[0]}.`;
  }

  const list = parts.map((part) => `- ${part}`).join('\n');
  return `${verb} icons from the Figma library:\n\n${list}`;
}

export function buildChangeset(icons: ImportedIcon[]): IconChangeset {
  const added = icons.filter((icon) => icon.added);
  const updated = icons.filter((icon) => !icon.added);
  const names = [
    ...new Set(icons.map((icon) => toComponentName(icon.name))),
  ].sort();
  const bump = added.length > 0 ? 'minor' : 'patch';
  const summary = [
    formatIconGroup('Added', added),
    formatIconGroup('Updated', updated),
  ]
    .filter(Boolean)
    .join('\n\n');

  let title = 'Sync icons from Figma';
  if (names.length > 0 && names.length <= 3) {
    title = `${added.length > 0 ? 'Add' : 'Update'} ${names.join(', ')} icons`;
  } else if (names.length > 3) {
    title = `${added.length > 0 ? 'Add' : 'Update'} ${names.length} icons from Figma`;
  }

  return {
    bump,
    title,
    summary,
    markdown: `---
'@sumup-oss/icons': ${bump}
---

${summary}
`,
  };
}

export function buildPullRequestBody(changeset: IconChangeset): string {
  return `## Summary

${changeset.summary}

Imported from the SumUp Figma iconography library.

## Test plan

- [ ] Icons render correctly on the Storybook Icons page
- [ ] Chromatic shows the expected visual diff
`;
}

/**
 * Records the Figma revision of every candidate that has a file on disk, so a
 * later run can tell an edited icon from an untouched one.
 */
export function buildLock(
  fileKey: string,
  candidates: SyncCandidate[],
  existing: ReadonlySet<string>,
  previous?: IconLock,
): IconLock {
  const icons: Record<string, LockEntry> = {};
  const carryOver = previous?.fileKey === fileKey ? previous.icons : {};

  for (const candidate of candidates) {
    if (!existing.has(iconFileName(candidate.name, candidate.size))) {
      continue;
    }
    const key = lockKey(candidate.name, candidate.size);
    icons[key] = {
      nodeId: candidate.nodeId,
      updatedAt: candidate.updatedAt ?? carryOver[key]?.updatedAt,
    };
  }

  return {
    fileKey,
    icons: Object.fromEntries(
      Object.entries(icons).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
}
