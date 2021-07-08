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

import { render, act, userEvent } from '../../util/test-utils';

import { useFocusList } from './useFocusList';

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

  describe('when pressing the arrow up key', () => {
    it('should focus the previous element when pressing the arrow down key', () => {
      const { getByTestId } = render(<MockComponent />);

      const lastElement = getByTestId('wrapper')
        .lastElementChild as HTMLElement;

      act(() => {
        lastElement.focus();
        userEvent.keyboard('{arrowUp}');
      });

      const expected = (list.length - 2).toString();

      expect(document.activeElement).toHaveAttribute('id', expected);
    });

    it('should focus the last element when at the beginning', () => {
      const { getByTestId } = render(<MockComponent />);

      const firstElement = getByTestId('wrapper')
        .firstElementChild as HTMLElement;

      act(() => {
        firstElement.focus();
        userEvent.keyboard('{arrowUp}');
      });

      const expected = (list.length - 1).toString();

      expect(document.activeElement).toHaveAttribute('id', expected);
    });
  });

  describe('when pressing the arrow down key', () => {
    it('should focus the next element', () => {
      const { getByTestId } = render(<MockComponent />);

      const firstElement = getByTestId('wrapper')
        .firstElementChild as HTMLElement;

      act(() => {
        firstElement.focus();
        userEvent.keyboard('{arrowDown}');
      });

      const expected = '1';

      expect(document.activeElement).toHaveAttribute('id', expected);
    });

    it('should focus the first element when at the end', () => {
      const { getByTestId } = render(<MockComponent />);

      const lastElement = getByTestId('wrapper')
        .lastElementChild as HTMLElement;

      act(() => {
        lastElement.focus();
        userEvent.keyboard('{arrowDown}');
      });

      const expected = '0';

      expect(document.activeElement).toHaveAttribute('id', expected);
    });
  });
});
