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

import type { FileContents } from '@pierre/diffs';
import type { FileOptions } from '@pierre/diffs/react';

import type { CodeHighlightOptions } from './types.js';
import shadowStyles from './CodeHighlight.shadow.css?inline';

export function getCodeHighlightConfig({
  code,
  language,
  filename,
  lineNumbers = false,
  wrap = false,
  highlightedLines = [],
}: CodeHighlightOptions): {
  file: FileContents;
  options: FileOptions<undefined, undefined>;
} {
  const lineCount = code.split(/\r\n|\r|\n/).length;
  const highlighted = [...new Set(highlightedLines)].filter(
    (line) => Number.isSafeInteger(line) && line > 0 && line <= lineCount,
  );
  const selectors = highlighted.flatMap((line) => [
    `[data-line="${line}"]`,
    `[data-column-number="${line}"]`,
  ]);

  const highlightStyles = selectors.length
    ? `${selectors.join(', ')} { background-color: var(--cui-bg-highlight); }`
    : '';

  return {
    file: { name: filename || 'code.txt', contents: code, lang: language },
    options: {
      theme: { light: 'github-light', dark: 'github-dark' },
      disableFileHeader: true,
      disableLineNumbers: !lineNumbers,
      overflow: wrap ? 'wrap' : 'scroll',
      // The code block inherits Circuit's colors and spacing, but needs its own styles.
      unsafeCSS: `${shadowStyles}\n${highlightStyles}`,
    },
  };
}
