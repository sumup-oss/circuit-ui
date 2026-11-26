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

import { render, waitFor } from '../../util/test-utils.js';

import { CodeHighlight } from './CodeHighlight.js';
import { Wrapped } from './CodeHighlight.stories.js';

describe('CodeHighlight client rendering', () => {
  afterEach(() => vi.unstubAllGlobals());
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
  it('loads the renderer and updates highlighted source when code changes', async () => {
    const { container, rerender } = render(
      <CodeHighlight
        filename="example.ts"
        code="const initial = 1;"
        highlightedLines={[1]}
      />,
    );
    // Testing Library queries do not traverse shadow roots.
    const getShadowRoot = () =>
      // eslint-disable-next-line testing-library/no-container
      container.querySelector('diffs-container')?.shadowRoot;
    const getCode = () => getShadowRoot()?.querySelector('[data-code]');
    const getHighlightStyles = () =>
      getShadowRoot()?.querySelector('style[data-unsafe-css]')?.textContent;
    await waitFor(() =>
      expect(getCode()?.textContent).toContain('const initial = 1;'),
    );
    expect(getHighlightStyles()).toContain('[data-line="1"]');
    rerender(
      <CodeHighlight
        filename="example.ts"
        code={'// updated\nconst updated = 2;'}
        highlightedLines={[2]}
      />,
    );
    await waitFor(() =>
      expect(getCode()?.textContent).toContain('const updated = 2;'),
    );
    expect(getHighlightStyles()).toContain('[data-line="2"]');
    expect(getHighlightStyles()).not.toContain('[data-line="1"]');
  });

  it('lets the wrapping story control switch between wrapping and scrolling', async () => {
    const code = '// A long comment with enough words to wrap. '.repeat(8);
    const { container, rerender } = render(
      <Wrapped code={code} wrap={false} />,
    );
    // Testing Library queries do not traverse shadow roots.
    const getOverflow = () =>
      // eslint-disable-next-line testing-library/no-container
      container
        .querySelector('diffs-container')
        ?.shadowRoot?.querySelector('pre')?.dataset.overflow;
    await waitFor(() => expect(getOverflow()).toBe('scroll'));
    rerender(<Wrapped code={code} wrap />);
    await waitFor(() => expect(getOverflow()).toBe('wrap'));
    rerender(<Wrapped code={code} wrap={false} />);
    await waitFor(() => expect(getOverflow()).toBe('scroll'));
  });
});
