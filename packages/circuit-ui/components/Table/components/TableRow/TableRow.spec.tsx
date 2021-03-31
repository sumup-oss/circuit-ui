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

import React from 'react';

import {
  create,
  render,
  renderToHtml,
  axe,
  act,
  userEvent,
} from '../../../../util/test-utils';

import TableRow from '.';

const children = 'Foo';

describe('TableHeader', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableRow>{children}</TableRow>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with clickable styles', () => {
      const actual = create(
        <TableRow onClick={jest.fn()}>{children}</TableRow>,
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Logic tests', () => {
    it('should call the onClick when clicked', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <TableRow onClick={onClick} data-testid="row">
          {children}
        </TableRow>,
      );
      const rowEl = getByTestId('row');

      act(() => {
        rowEl.focus();
        userEvent.click(rowEl);
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call the onClick when navigating with the keyboard', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <TableRow onClick={onClick} data-testid="row">
          {children}
        </TableRow>,
      );
      const rowEl = getByTestId('row');

      act(() => {
        rowEl.focus();
        userEvent.type(rowEl, '{enter}');
        userEvent.type(rowEl, ' ');
      });

      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<TableRow>{children}</TableRow>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
