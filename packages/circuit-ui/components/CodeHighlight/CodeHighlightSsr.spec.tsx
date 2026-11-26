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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';

import { waitFor } from '../../util/test-utils.js';

import { CodeHighlightSsr } from './CodeHighlightSsr.js';
import { preloadCodeHighlight } from './server.js';

describe('CodeHighlight SSR', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it('renders highlighted server HTML and hydrates it without a mismatch', async () => {
    const props = await preloadCodeHighlight({
      code: 'const total = 42;\nconsole.log(total);',
      language: 'typescript',
      highlightedLines: [2],
      wrap: true,
    });
    const browserWindow = window;
    let view: string;
    // Hide window to render the same HTML as on the server.
    vi.stubGlobal('window', undefined);
    try {
      view = renderToString(<CodeHighlightSsr {...props} />);
    } finally {
      vi.stubGlobal('window', browserWindow);
    }
    expect(view).toContain('shadowrootmode="open"');
    expect(view).toContain('--diffs-token-light');
    expect(view).toContain('--diffs-token-dark');
    expect(view).not.toContain('data-color-scheme="light"');
    expect(view).toContain('[data-line="2"]');

    const container = document.createElement('div');
    container.innerHTML = view;
    document.body.append(container);
    const host = container.querySelector('diffs-container');
    const template = host?.querySelector('template');
    if (!host || !template) {
      throw new Error('Missing server-rendered shadow template');
    }
    // Create the shadow root manually because jsdom does not process the template.
    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    shadow.append(template.content);
    template.remove();
    const onRecoverableError = vi.fn();
    let root: Root | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, <CodeHighlightSsr {...props} />, {
          onRecoverableError,
        });
      });
      expect(shadow.querySelector('[data-code]')?.textContent).toContain(
        'const total = 42;',
      );
      expect(onRecoverableError).not.toHaveBeenCalled();
      // eslint-disable-next-line testing-library/no-unnecessary-act -- This is React Root.render, not Testing Library render.
      await act(async () => {
        root?.render(<CodeHighlightSsr {...props} code="const updated = 7;" />);
      });
      await waitFor(() =>
        expect(shadow.querySelector('[data-code]')?.textContent).toContain(
          'const updated = 7;',
        ),
      );
    } finally {
      await act(async () => root?.unmount());
      container.remove();
    }
  });
});
