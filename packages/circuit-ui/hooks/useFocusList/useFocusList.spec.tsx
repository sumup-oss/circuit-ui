/**
 * Copyright 2019, SumUp Ltd.
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

import { render, act, userEvent, screen } from '../../util/test-utils.js';

import { useFocusList } from './useFocusList.js';

describe('useFocusList', () => {
  const list = Array.from(Array(5).keys());

  function MockComponent() {
    const focusProps = useFocusList();

    return (
      <div data-testid="wrapper">
        {list.map((index: number) => (
          <button key={index} id={index.toString()} {...focusProps} />
        ))}
      </div>
    );
  }

  describe('when pressing the ArrowUp key', () => {
    it('should focus the previous element', async () => {
      render(<MockComponent />);

      const lastElement = screen.getByTestId('wrapper')
        .lastElementChild as HTMLElement;

      act(() => {
        lastElement.focus();
      });

      await userEvent.keyboard('{ArrowUp}');

      const expected = (list.length - 2).toString();

      expect(document.activeElement).toHaveAttribute('id', expected);
    });

    it('should focus the last element when at the beginning', async () => {
      render(<MockComponent />);

      const firstElement = screen.getByTestId('wrapper')
        .firstElementChild as HTMLElement;

      act(() => {
        firstElement.focus();
      });

      await userEvent.keyboard('{ArrowUp}');

      const expected = (list.length - 1).toString();

      expect(document.activeElement).toHaveAttribute('id', expected);
    });
  });

  describe('when pressing the ArrowDown key', () => {
    it('should focus the next element', async () => {
      render(<MockComponent />);

      const firstElement = screen.getByTestId('wrapper')
        .firstElementChild as HTMLElement;

      act(() => {
        firstElement.focus();
      });

      await userEvent.keyboard('{ArrowDown}');

      const expected = '1';

      expect(document.activeElement).toHaveAttribute('id', expected);
    });

    it('should focus the first element when at the end', async () => {
      render(<MockComponent />);

      const lastElement = screen.getByTestId('wrapper')
        .lastElementChild as HTMLElement;

      act(() => {
        lastElement.focus();
      });

      await userEvent.keyboard('{ArrowDown}');

      const expected = '0';

      expect(document.activeElement).toHaveAttribute('id', expected);
    });
  });
});
