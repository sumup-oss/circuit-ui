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

function isWhiteColor(color: string): boolean {
  const value = color.toLowerCase().replace(/\s/g, '');
  return (
    value === '#fff' ||
    value === '#ffffff' ||
    value === '#ffffffff' ||
    value === 'rgb(255,255,255)' ||
    value === 'rgba(255,255,255,1)'
  );
}

/**
 * Rewrites hardcoded fill/stroke colors to currentColor so the icon can be
 * themed in CSS. White is left alone — it is used for holes and knockouts.
 */
export function applyCurrentColor(svg: string): string {
  return svg.replace(
    /\b(fill|stroke)="(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\))"/g,
    (full, attr: string, color: string) =>
      isWhiteColor(color) ? full : `${attr}="currentColor"`,
  );
}

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
  } catch {
    throw new Error(`Invalid Figma URL: ${url}`);
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

    const unexpected = colorAttrs.filter((value) => !isWhiteColor(value));

    if (unexpected.length > 0) {
      issues.push({
        code: 'color',
        message: `Found hardcoded fill/stroke (${unexpected.slice(0, 3).join(', ')}). Monochrome icons should use currentColor. Brand logos are exempt — pass --category Brand (or Card scheme / Payment method).`,
      });
    }
  }

  return issues;
}

/** Figma frames spell categories loosely: "Card schemes", "Product & feature". */
function normalizeCategory(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Drops a plural "s" from the last word, so "card schemes" matches "Card scheme". */
function singularizeCategory(value: string): string {
  return value.replace(/(\w+?)s$/, '$1');
}

const CATEGORIES_BY_LABEL = new Map<string, (typeof CATEGORIES)[number]>(
  CATEGORIES.flatMap((category) => {
    const normalized = normalizeCategory(category);
    return [
      [normalized, category] as const,
      [singularizeCategory(normalized), category] as const,
    ];
  }),
);

function matchCategory(value: string): (typeof CATEGORIES)[number] | undefined {
  const normalized = normalizeCategory(value);
  return (
    CATEGORIES_BY_LABEL.get(normalized) ??
    CATEGORIES_BY_LABEL.get(singularizeCategory(normalized))
  );
}

/**
 * Resolves the first candidate that names a manifest category. Candidates are
 * checked in order, so pass the closest Figma ancestor first. Names like
 * "Icons / Country flags" are also matched segment by segment.
 */
export function inferCategory(
  ...candidates: Array<string | undefined>
): (typeof CATEGORIES)[number] | undefined {
  const defined = candidates.filter((candidate): candidate is string =>
    Boolean(candidate),
  );

  for (const candidate of defined) {
    const match = matchCategory(candidate);
    if (match) {
      return match;
    }
  }

  for (const candidate of defined) {
    for (const segment of candidate.split(/[/|>·–—]/)) {
      const match = matchCategory(segment);
      if (match) {
        return match;
      }
    }
  }

  return undefined;
}

function indexesWhere(
  icons: ManifestIcon[],
  predicate: (icon: ManifestIcon) => boolean,
): number[] {
  return icons.reduce<number[]>((indexes, icon, index) => {
    if (predicate(icon)) {
      indexes.push(index);
    }
    return indexes;
  }, []);
}

/**
 * Finds where a new icon belongs, anchored on the entries around it rather than
 * on a global sort. manifest.json is not fully sorted: `Filled` variants sit
 * next to the icon they mirror, and a name like `visa` appears under both
 * `Card scheme` and `Payment method`, so re-sorting the file would scramble it.
 */
function manifestInsertIndex(
  icons: ManifestIcon[],
  entry: ManifestIcon,
): number {
  const siblings = indexesWhere(
    icons,
    (icon) => icon.name === entry.name && icon.category === entry.category,
  );

  if (siblings.length > 0) {
    const larger = siblings.filter(
      (index) => Number(icons[index].size) > Number(entry.size),
    );
    return larger.length > 0 ? Math.max(...larger) + 1 : Math.min(...siblings);
  }

  const sameCategory = indexesWhere(
    icons,
    (icon) => icon.category === entry.category,
  );

  if (sameCategory.length > 0) {
    const earlier = sameCategory.filter(
      (index) => icons[index].name.localeCompare(entry.name) < 0,
    );
    return earlier.length > 0
      ? Math.max(...earlier) + 1
      : Math.min(...sameCategory);
  }

  return icons.length;
}

/**
 * Inserts an icon next to its siblings, or updates it in place. Existing entries
 * keep their order so that an import diff only shows the new icons.
 */
export function upsertManifestIcon(
  icons: ManifestIcon[],
  entry: ManifestIcon,
): ManifestIcon[] {
  // Entries are identified by category as well as name and size, because names
  // such as `visa` exist under both `Card scheme` and `Payment method`.
  const index = icons.findIndex(
    (icon) =>
      icon.name === entry.name &&
      icon.size === entry.size &&
      icon.category === entry.category,
  );

  if (index !== -1) {
    const next = [...icons];
    next[index] = { ...icons[index], ...entry };
    return next;
  }

  const insertAt = manifestInsertIndex(icons, entry);
  return [...icons.slice(0, insertAt), entry, ...icons.slice(insertAt)];
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

export type SyncCandidate = {
  nodeId: string;
  name: string;
  size: IconSize;
  category?: (typeof CATEGORIES)[number];
};

export type SyncDecision = 'new' | 'existing' | 'deprecated';

export type SyncSelection = {
  targets: Array<SyncCandidate & { decision: SyncDecision }>;
  counts: Record<SyncDecision, number>;
  truncated: boolean;
};

export function iconKey(name: string, size: string): string {
  return `${name}_${size}`;
}

/**
 * A candidate is "new" when no SVG exists yet. Existing files are left alone
 * unless `--include all` is passed. Deprecated manifest entries are never
 * re-imported.
 */
export function classifyCandidate(
  candidate: SyncCandidate,
  options: {
    existing: ReadonlySet<string>;
    deprecated?: ReadonlySet<string>;
  },
): SyncDecision {
  const key = iconKey(candidate.name, candidate.size);

  if (options.deprecated?.has(key)) {
    return 'deprecated';
  }

  if (!options.existing.has(iconFileName(candidate.name, candidate.size))) {
    return 'new';
  }

  return 'existing';
}

function isIncluded(decision: SyncDecision, include: 'new' | 'all'): boolean {
  if (decision === 'deprecated') {
    return false;
  }
  if (include === 'all') {
    return true;
  }
  return decision === 'new';
}

export function selectSyncTargets(
  candidates: SyncCandidate[],
  options: {
    existing: ReadonlySet<string>;
    deprecated?: ReadonlySet<string>;
    include: 'new' | 'all';
    limit?: number;
  },
): SyncSelection {
  const counts: Record<SyncDecision, number> = {
    new: 0,
    existing: 0,
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
  return `sizes ${unique.slice(0, -1).join(', ')}, and ${unique[unique.length - 1]}`;
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
