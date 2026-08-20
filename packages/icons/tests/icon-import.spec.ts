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

import { describe, expect, it } from 'vitest';

import {
  DEFAULT_FIGMA_FILE_KEY,
  DEFAULT_FIGMA_NODE_ID,
  DEFAULT_FIGMA_URL,
  type SyncCandidate,
  buildChangeset,
  buildLock,
  classifyCandidate,
  iconFileName,
  inferCategory,
  isOnPixelGrid,
  lintImportedSvg,
  parseFigmaUrl,
  parseSizeFromName,
  resolvePublishedIcon,
  selectSyncTargets,
  sortManifestIcons,
  toComponentName,
  toSnakeName,
  upsertManifestIcon,
} from '../scripts/icon-import.js';

describe('parseFigmaUrl', () => {
  it('parses the Circuit UI Foundation icons URL', () => {
    expect(parseFigmaUrl(DEFAULT_FIGMA_URL)).toEqual({
      fileKey: DEFAULT_FIGMA_FILE_KEY,
      nodeId: DEFAULT_FIGMA_NODE_ID,
    });
  });

  it('uses the branch key as the file key', () => {
    expect(
      parseFigmaUrl(
        'https://www.figma.com/design/fileKey/branch/branchKey/Name?node-id=1-2',
      ),
    ).toEqual({ fileKey: 'branchKey', nodeId: '1:2' });
  });
});

describe('toSnakeName', () => {
  it.each([
    ['Add Items', 'add_items'],
    ['add_items_24', 'add_items'],
    ['Size=24', ''],
    ['Add Items / 24', 'add_items'],
    ['add-items', 'add_items'],
  ])('normalizes %s', (input, expected) => {
    expect(toSnakeName(input)).toBe(expected);
  });
});

describe('parseSizeFromName', () => {
  it('reads a size variant', () => {
    expect(parseSizeFromName('Size=24')).toBe('24');
    expect(parseSizeFromName('add_items_16')).toBe('16');
  });
});

describe('resolvePublishedIcon', () => {
  it('uses the component set name for variants', () => {
    expect(
      resolvePublishedIcon({
        name: 'Size=24',
        componentSetName: 'Add Items',
      }),
    ).toEqual({ name: 'add_items', size: '24' });
  });
});

describe('lintImportedSvg', () => {
  const good = `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M0 0h24v24H0z"/></svg>`;

  it('accepts a well-formed 24px icon', () => {
    expect(lintImportedSvg(good, { size: '24' })).toEqual([]);
  });

  it('rejects clip-path and off-size viewBoxes', () => {
    const bad = `<svg width="32" height="25" viewBox="0 0 32 25"><g clip-path="url(#clip0)"><path fill="#007858" d="M0 0h32v25H0z"/></g></svg>`;
    const issues = lintImportedSvg(bad, { size: '32' });
    expect(issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(['size', 'clip-path', 'color']),
    );
  });

  it('allows hardcoded colors for brand categories', () => {
    const brand = `<svg width="32" height="24" viewBox="0 0 32 24"><path fill="#1434cb" d="M0 0h32v24H0z"/></svg>`;
    expect(
      lintImportedSvg(brand, { size: '32', category: 'Card scheme' }),
    ).toEqual([]);
  });
});

describe('manifest helpers', () => {
  it('sorts by category, name, then size descending', () => {
    const sorted = sortManifestIcons([
      { name: 'add', category: 'Action', size: '16' },
      { name: 'add', category: 'Action', size: '24' },
      { name: 'visa', category: 'Card scheme', size: '32' },
    ]);
    expect(
      sorted.map((icon) => `${icon.category}:${icon.name}:${icon.size}`),
    ).toEqual(['Action:add:24', 'Action:add:16', 'Card scheme:visa:32']);
  });

  it('upserts without dropping existing metadata', () => {
    const next = upsertManifestIcon(
      [
        {
          name: 'add',
          category: 'Action',
          size: '24',
          deprecation: 'Use Plus',
        },
      ],
      { name: 'add', category: 'Navigation', size: '24' },
    );
    expect(next[0]).toMatchObject({
      category: 'Navigation',
      deprecation: 'Use Plus',
    });
  });
});

describe('library sync', () => {
  const candidate = (
    name: string,
    size: '16' | '24' | '32',
    updatedAt?: string,
  ): SyncCandidate => ({
    nodeId: `1:${name.length}${size}`,
    name,
    size,
    updatedAt,
    category: 'Action',
  });

  it('treats a missing SVG as new', () => {
    expect(
      classifyCandidate(candidate('sparkles', '24'), {
        existing: new Set(['add_24.svg']),
      }),
    ).toBe('new');
  });

  it('does not re-import existing icons that are absent from the lock file', () => {
    expect(
      classifyCandidate(candidate('add', '24', '2026-01-01T00:00:00Z'), {
        existing: new Set(['add_24.svg']),
      }),
    ).toBe('unchanged');
  });

  it('detects an icon edited in Figma since the last import', () => {
    const options = {
      existing: new Set(['add_24.svg']),
      lock: {
        fileKey: DEFAULT_FIGMA_FILE_KEY,
        icons: { add_24: { nodeId: '1:1', updatedAt: '2026-01-01T00:00:00Z' } },
      },
    };

    expect(
      classifyCandidate(
        candidate('add', '24', '2026-01-01T00:00:00Z'),
        options,
      ),
    ).toBe('unchanged');
    expect(
      classifyCandidate(
        candidate('add', '24', '2026-06-01T00:00:00Z'),
        options,
      ),
    ).toBe('changed');
  });

  it('skips icons that were deprecated in the manifest', () => {
    expect(
      classifyCandidate(candidate('add_items', '24'), {
        existing: new Set(),
        deprecated: new Set(['add_items_24']),
      }),
    ).toBe('deprecated');
  });

  it('selects only new icons by default and honours the limit', () => {
    const candidates = [
      candidate('add', '24', '2026-06-01T00:00:00Z'),
      candidate('sparkles', '24'),
      candidate('wallet', '16'),
    ];
    const options = {
      existing: new Set(['add_24.svg']),
      lock: {
        fileKey: DEFAULT_FIGMA_FILE_KEY,
        icons: { add_24: { nodeId: '1:1', updatedAt: '2026-01-01T00:00:00Z' } },
      },
    };

    const newOnly = selectSyncTargets(candidates, {
      ...options,
      include: 'new',
    });
    expect(newOnly.targets.map((target) => target.name)).toEqual([
      'sparkles',
      'wallet',
    ]);
    expect(newOnly.counts).toMatchObject({ new: 2, changed: 1 });

    const withChanged = selectSyncTargets(candidates, {
      ...options,
      include: 'changed',
      limit: 2,
    });
    expect(withChanged.targets).toHaveLength(2);
    expect(withChanged.truncated).toBe(true);
  });

  it('seeds the lock file from icons that exist on disk', () => {
    const lock = buildLock(
      DEFAULT_FIGMA_FILE_KEY,
      [
        candidate('add', '24', '2026-01-01T00:00:00Z'),
        candidate('sparkles', '24', '2026-02-01T00:00:00Z'),
      ],
      new Set(['add_24.svg']),
    );

    expect(lock.fileKey).toBe(DEFAULT_FIGMA_FILE_KEY);
    expect(Object.keys(lock.icons)).toEqual(['add_24']);
    expect(lock.icons.add_24.updatedAt).toBe('2026-01-01T00:00:00Z');
  });
});

describe('changeset', () => {
  it('turns snake_case names into component names', () => {
    expect(toComponentName('add_items')).toBe('AddItems');
  });

  it('writes a minor changeset for new icons', () => {
    const changeset = buildChangeset([
      { name: 'sparkles', size: '24', added: true },
      { name: 'wallet', size: '16', added: true },
      { name: 'wallet', size: '24', added: true },
    ]);

    expect(changeset.bump).toBe('minor');
    expect(changeset.title).toBe('Add Sparkles, Wallet icons');
    expect(changeset.markdown).toContain("'@sumup-oss/icons': minor");
    expect(changeset.summary).toContain('`Sparkles` in size 24');
    expect(changeset.summary).toContain('`Wallet` in sizes 24 and 16');
  });

  it('writes a patch changeset when only existing icons were updated', () => {
    const changeset = buildChangeset([
      { name: 'add', size: '24', added: false },
    ]);

    expect(changeset.bump).toBe('patch');
    expect(changeset.summary).toBe('Updated `Add` in size 24.');
  });
});

describe('misc', () => {
  it('builds the expected file name', () => {
    expect(iconFileName('add_items', '24')).toBe('add_items_24.svg');
  });

  it('detects off-grid placement', () => {
    expect(isOnPixelGrid(24, 16)).toBe(true);
    expect(isOnPixelGrid(24.37, 16)).toBe(false);
  });

  it('infers a known category', () => {
    expect(inferCategory('action')).toBe('Action');
    expect(inferCategory('Unknown')).toBeUndefined();
  });
});
