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

import { describe, expect, it, vi } from 'vitest';
import { createRef, useState } from 'react';
import { renderToString } from 'react-dom/server';

import { act, render, screen, waitFor } from '../../util/test-utils.js';

import { CodeHighlight } from './CodeHighlight.js';

vi.mock('./CodeHighlightComponent.js', () => {
  throw new Error('Renderer unavailable');
});

describe('CodeHighlight', () => {
  it('renders escaped source on the server without loading the renderer', () => {
    const view = renderToString(
      <CodeHighlight
        code={'<script>alert("hello")</script>'}
        filename="example.html"
      />,
    );
    expect(view).toContain('&lt;script&gt;');
    expect(view).not.toContain('<script>');
    expect(view).not.toContain('example.html');
    expect(view).not.toContain('figcaption');
    expect(view).not.toContain('data-color-scheme');
  });

  it('forwards the ref and custom HTML attributes to the wrapper', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <CodeHighlight
        code="const total = 42;"
        ref={ref}
        className="custom"
        data-testid="snippet"
        data-color-scheme="dark"
      />,
    );
    expect(ref.current).toBe(screen.getByTestId('snippet'));
    expect(ref.current).toHaveClass('custom');
    expect(ref.current).toHaveAttribute('data-color-scheme', 'dark');
  });

  it('keeps current source readable when the renderer fails to load', async () => {
    const onHighlightError = vi.fn();
    const { rerender } = render(
      <CodeHighlight code="initial" onHighlightError={onHighlightError} />,
    );
    await waitFor(() => expect(onHighlightError).toHaveBeenCalledOnce());
    rerender(
      <CodeHighlight code="updated" onHighlightError={onHighlightError} />,
    );
    expect(screen.getByText('updated')).toBeVisible();
  });

  it('reports a load failure once when an inline callback updates the parent', async () => {
    const reportError = vi.fn();
    function Example() {
      const [failed, setFailed] = useState(false);
      return (
        <>
          <CodeHighlight
            code="const total = 42;"
            onHighlightError={(error) => {
              reportError(error);
              setFailed(true);
            }}
          />
          {failed && <p>Highlighting unavailable</p>}
        </>
      );
    }
    render(<Example />);
    await screen.findByText('Highlighting unavailable');
    await act(() => Promise.resolve());
    expect(reportError).toHaveBeenCalledOnce();
  });
});
