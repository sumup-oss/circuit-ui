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

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Plugin as VitePlugin } from 'vite';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const UTILITY_MARKER_START = 'UTIL CLASSES MARKER START';
export const UTILITY_MARKER_END = 'UTIL CLASSES MARKER END';

function findCommentBlock(
  source: string,
  marker: string,
): { start: number; end: number } | null {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    return null;
  }

  const start = source.lastIndexOf('/*', markerIndex);
  if (start === -1) {
    return null;
  }

  const end = source.indexOf('*/', markerIndex);
  if (end === -1 || end !== start + marker.length + 4) {
    return null;
  }

  return { start, end: end + 2 };
}

function removeRanges(source: string, ranges: [number, number][]): string {
  return ranges
    .sort(([left], [right]) => right - left)
    .reduce(
      (result, [from, to]) => result.slice(0, from) + result.slice(to),
      source,
    );
}

export function reorderUtilityCss(source: string): string {
  const startBlock = findCommentBlock(source, UTILITY_MARKER_START);
  const endBlock = findCommentBlock(source, UTILITY_MARKER_END);

  if (!startBlock || !endBlock) {
    throw new Error('Could not find utility CSS marker in the CSS file.');
  }

  let utilityCss: string;
  let rangesToRemove: [number, number][];

  if (startBlock.start < endBlock.start) {
    utilityCss = source.slice(startBlock.end, endBlock.start).trim();
    rangesToRemove = [[startBlock.start, endBlock.end]];
  } else {
    throw new Error('Utility CSS marker is not in the correct order.');
  }

  if (!utilityCss) {
    return source;
  }

  const withoutUtility = removeRanges(source, rangesToRemove).trimEnd();

  return `${withoutUtility}\n\n${utilityCss}\n`;
}

export function reorderUtilityCssVitePlugin(
  stylesFileName: string,
): VitePlugin {
  return {
    name: 'reorder-utility-css',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const cssPath = path.join(packageRoot, 'dist', stylesFileName);

      if (!fs.existsSync(cssPath)) {
        return;
      }

      const source = fs.readFileSync(cssPath, 'utf8');
      const reordered = reorderUtilityCss(source);

      if (reordered !== source) {
        fs.writeFileSync(cssPath, reordered);
      }
    },
  };
}
