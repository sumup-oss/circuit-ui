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

import { preloadFile } from '@pierre/diffs/ssr';

import { getCodeHighlightConfig } from './options.js';
import type { CodeHighlightOptions, PreloadedCodeHighlight } from './types.js';

/** Generate highlighted HTML on the server or at build time. */
export async function renderCodeHighlight(
  props: CodeHighlightOptions,
): Promise<string> {
  const { prerenderedHTML } = await preloadFile(getCodeHighlightConfig(props));
  return prerenderedHTML;
}

/** Prepare highlighted code on the server for CodeHighlight from the code/ssr entry point. */
export async function preloadCodeHighlight(
  props: CodeHighlightOptions,
): Promise<PreloadedCodeHighlight> {
  return { ...props, prerenderedHTML: await renderCodeHighlight(props) };
}
