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

'use client';

import type { CodeHighlightProps } from './CodeHighlight.js';
import type { PreloadedCodeHighlight } from './types.js';
import { CodeHighlightComponent } from './CodeHighlightComponent.js';
import { clsx } from '../../styles/clsx.js';
import { codeHighlightClasses as classes } from './styles.js';

export interface CodeHighlightSsrProps
  extends Omit<CodeHighlightProps, 'onHighlightError'>,
    PreloadedCodeHighlight {}

/** Displays highlighted code before JavaScript loads and updates it when props change. */
export function CodeHighlightSsr({
  code,
  language,
  filename,
  lineNumbers,
  wrap,
  highlightedLines,
  prerenderedHTML,
  className,
  ...props
}: CodeHighlightSsrProps) {
  return (
    <div {...props} className={clsx(classes.base, className)}>
      <CodeHighlightComponent
        {...{
          code,
          language,
          filename,
          lineNumbers,
          wrap,
          highlightedLines,
          prerenderedHTML,
        }}
      />
    </div>
  );
}
