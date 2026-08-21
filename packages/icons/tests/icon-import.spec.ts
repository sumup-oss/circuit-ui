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
  type ManifestIcon,
  type SyncCandidate,
  buildChangeset,
  applyCurrentColor,
  classifyCandidate,
  iconFileName,
  inferCategory,
  isOnPixelGrid,
  lintImportedSvg,
  parseFigmaUrl,
  parseSizeFromName,
  resolvePublishedIcon,
  selectSyncTargets,
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

  it('rewrites hardcoded ink to currentColor and leaves white alone', () => {
    const ink = `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#1E1C1C" d="M0 0h24v24H0z"/><path fill="#fff" d="M8 8h8v8H8z"/></svg>`;
    const converted = applyCurrentColor(ink);
    expect(converted).toContain('fill="currentColor"');
    expect(converted).toContain('fill="#fff"');
    expect(lintImportedSvg(converted, { size: '24' })).toEqual([]);
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
  it('inserts a new size next to its siblings', () => {
    const next = upsertManifestIcon(
      [
        { name: 'arrow_down', category: 'Navigation', size: '24' },
        { name: 'arrow_left', category: 'Navigation', size: '24' },
      ],
      { name: 'arrow_down', category: 'Navigation', size: '16' },
    );
    expect(next.map((icon) => `${icon.name}:${icon.size}`)).toEqual([
      'arrow_down:24',
      'arrow_down:16',
      'arrow_left:24',
    ]);
  });

  it('keeps the existing order of unrelated entries', () => {
    const icons: ManifestIcon[] = [
      { name: 'zoom', category: 'Miscellaneous', size: '24' },
      { name: 'checkmark', category: 'Filled', size: '24' },
      { name: 'alert', category: 'Miscellaneous', size: '24' },
    ];
    const next = upsertManifestIcon(icons, {
      name: 'bell',
      category: 'Miscellaneous',
      size: '24',
    });
    expect(next.map((icon) => icon.name)).toEqual([
      'zoom',
      'checkmark',
      'alert',
      'bell',
    ]);
  });

  it('does not place an icon next to a same-named icon in another category', () => {
    const next = upsertManifestIcon(
      [
        { name: 'visa', category: 'Card scheme', size: '24' },
        { name: 'ideal', category: 'Payment method', size: '24' },
      ],
      { name: 'visa', category: 'Payment method', size: '24' },
    );
    expect(next.map((icon) => `${icon.category}:${icon.name}`)).toEqual([
      'Card scheme:visa',
      'Payment method:ideal',
      'Payment method:visa',
    ]);
  });

  it('appends an icon whose category is not in the manifest yet', () => {
    const next = upsertManifestIcon(
      [{ name: 'add', category: 'Action', size: '24' }],
      { name: 'wheat', category: 'Allergen', size: '24' },
    );
    expect(next.map((icon) => icon.name)).toEqual(['add', 'wheat']);
  });

  it('upserts without dropping existing metadata', () => {
    const next = upsertManifestIcon(
      [
        {
          name: 'add',
          category: 'Action',
          size: '24',
          deprecation: 'Use Plus',
          keywords: ['plus'],
        },
      ],
      { name: 'add', category: 'Action', size: '24' },
    );
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({
      category: 'Action',
      deprecation: 'Use Plus',
      keywords: ['plus'],
    });
  });
});

describe('library sync', () => {
  const candidate = (
    name: string,
    size: '16' | '24' | '32',
  ): SyncCandidate => ({
    nodeId: `1:${name.length}${size}`,
    name,
    size,
    category: 'Action',
  });

  it('treats a missing SVG as new', () => {
    expect(
      classifyCandidate(candidate('sparkles', '24'), {
        existing: new Set(['add_24.svg']),
      }),
    ).toBe('new');
  });

  it('treats an SVG that is already on disk as existing', () => {
    expect(
      classifyCandidate(candidate('add', '24'), {
        existing: new Set(['add_24.svg']),
      }),
    ).toBe('existing');
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
      candidate('add', '24'),
      candidate('sparkles', '24'),
      candidate('wallet', '16'),
    ];
    const options = {
      existing: new Set(['add_24.svg']),
    };

    const newOnly = selectSyncTargets(candidates, {
      ...options,
      include: 'new',
    });
    expect(newOnly.targets.map((target) => target.name)).toEqual([
      'sparkles',
      'wallet',
    ]);
    expect(newOnly.counts).toMatchObject({ new: 2, existing: 1 });

    const all = selectSyncTargets(candidates, {
      ...options,
      include: 'all',
      limit: 2,
    });
    expect(all.targets).toHaveLength(2);
    expect(all.truncated).toBe(true);
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

  it('infers a category from loose Figma frame names', () => {
    expect(inferCategory('Card schemes')).toBe('Card scheme');
    expect(inferCategory('Product & feature')).toBe('Product and feature');
    expect(inferCategory('Social  Media')).toBe('Social media');
  });

  it('infers a category from a nested frame name', () => {
    expect(inferCategory('Icons / Country flags')).toBe('Country flag');
  });

  it('prefers the closest ancestor', () => {
    expect(inferCategory('Navigation', 'Icons', 'Action')).toBe('Navigation');
  });

  it('skips ancestors that name no category', () => {
    expect(inferCategory('24px', 'Deprecated', 'Security')).toBe('Security');
  });

  it('does not confuse country flags with flags', () => {
    expect(inferCategory('Country flag')).toBe('Country flag');
    expect(inferCategory('Flags')).toBe('Flag');
  });
});
