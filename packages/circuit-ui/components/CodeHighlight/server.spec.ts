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

import { renderCodeHighlight } from './server.js';

describe('renderCodeHighlight', () => {
  it('highlights source while preventing it from escaping the shadow template', async () => {
    const source = '</template><img src=x onerror=alert(1)>';
    const view = await renderCodeHighlight({
      code: source,
      language: 'html',
      lineNumbers: false,
    });
    const template = document.createElement('template');
    template.innerHTML = view;
    expect(template.content.querySelector('img, script, template')).toBeNull();
    expect(
      template.content.querySelector('[data-code]')?.textContent,
    ).toContain(source);
    expect(template.content.querySelector('[data-line] span')).not.toBeNull();
    expect(view).toContain('--diffs-token-light');
    expect(view).toContain('--diffs-token-dark');
  });

  it('infers syntax from filenames and supports wrapped blocks', async () => {
    const view = await renderCodeHighlight({
      code: 'const total = 42;',
      filename: 'example.ts',
      wrap: true,
    });
    const template = document.createElement('template');
    template.innerHTML = view;
    expect(
      template.content.querySelector('[data-overflow="wrap"]'),
    ).not.toBeNull();
    expect(template.content.querySelector('[data-line] span')).not.toBeNull();
    expect(
      template.content.querySelector('[data-disable-line-numbers]'),
    ).not.toBeNull();
  });

  it.each([
    '\n',
    '\r',
    '\r\n',
  ])('emphasizes valid one-based lines separated by %j and their gutters without rendering a header', async (lineBreak) => {
    const view = await renderCodeHighlight({
      code: ['const first = 1;', 'const second = 2;', 'const third = 3;'].join(
        lineBreak,
      ),
      filename: 'example.ts',
      lineNumbers: true,
      highlightedLines: [2, 2, 3, 0, -1, 1.5, NaN, Infinity, 4, 99],
    });
    const template = document.createElement('template');
    template.innerHTML = view;
    expect(template.content.querySelector('[data-diffs-header]')).toBeNull();
    expect(
      template.content.querySelector('[data-disable-line-numbers]'),
    ).toBeNull();
    expect(view).toContain('[data-line="2"]');
    expect(view).toContain('[data-column-number="3"]');
    expect(view).not.toContain('[data-line="0"]');
    expect(view).not.toContain('[data-line="4"]');
    expect(view).not.toContain('[data-line="99"]');
    expect(view).not.toContain('[data-line="1.5"]');
  });
});
