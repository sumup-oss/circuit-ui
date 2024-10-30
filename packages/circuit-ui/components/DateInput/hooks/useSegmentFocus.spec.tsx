/**
 * Copyright 2024, SumUp Ltd.
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

import { render, screen, userEvent } from '../../../util/test-utils.js';

import { useSegmentFocus } from './useSegmentFocus.js';

describe('useSegmentFocus', () => {
  const list = Array.from(Array(5).keys());

  function MockComponent({ action }: { action: 'previous' | 'next' }) {
    const focus = useSegmentFocus();

    return (
      <>
        {list.map((index: number) => (
          <button
            key={index}
            id={index.toString()}
            onClick={focus[action]}
            {...focus.props}
          />
        ))}
      </>
    );
  }

  it('should focus the previous element', async () => {
    render(<MockComponent action="previous" />);

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[buttons.length - 1]);

    const expected = (list.length - 2).toString();

    expect(document.activeElement).toHaveAttribute('id', expected);
  });

  it('should do nothing when at the beginning', async () => {
    render(<MockComponent action="previous" />);

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[0]);

    const expected = '0';

    expect(document.activeElement).toHaveAttribute('id', expected);
  });

  it('should focus the next element', async () => {
    render(<MockComponent action="next" />);

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[0]);

    const expected = '1';

    expect(document.activeElement).toHaveAttribute('id', expected);
  });

  it('should do nothing when at the end', async () => {
    render(<MockComponent action="next" />);

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[buttons.length - 1]);

    const expected = (list.length - 1).toString();

    expect(document.activeElement).toHaveAttribute('id', expected);
  });
});
