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

export interface CodeHighlightOptions {
  /** Code to display. */
  code: string;
  /** Language to highlight. Inferred from filename when omitted. */
  language?: FileContents['lang'];
  /** Filename used to choose the language. Not displayed. */
  filename?: string;
  /** Show line numbers. Default: false. */
  lineNumbers?: boolean;
  /** Wrap long lines instead of scrolling horizontally. Default: false. */
  wrap?: boolean;
  /** Line numbers to highlight, starting at 1. */
  highlightedLines?: readonly number[];
}

/** Highlighted code and display options to pass to CodeHighlight from the code/ssr entry point. */
export interface PreloadedCodeHighlight extends CodeHighlightOptions {
  prerenderedHTML: string;
}
