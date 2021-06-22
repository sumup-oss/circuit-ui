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

import {
  create,
  render,
  renderToHtml,
  axe,
  act,
  userEvent,
} from '../../../../util/test-utils';
import { Cell, Direction } from '../../types';

import TableHead from '.';

const sortLabel = ({ direction }: { direction?: Direction }) => {
  const order = direction === 'ascending' ? 'descending' : 'ascending';
  return `Sort in ${order} order`;
};
const fixtureHeaders: Cell[] = [
  { children: 'Foo', sortable: true, sortLabel },
  'Bar',
  'Baz',
];

describe('TableHead', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableHead headers={fixtureHeaders} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with rowHeader styles', () => {
      const actual = create(<TableHead rowHeaders headers={fixtureHeaders} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('onClick', () => {
    it('should not dispatch the onSortBy handler when the column is not sortable', () => {
      const headers = ['Foo'];
      const onSortByMock = jest.fn();
      const { getByRole } = render(
        <TableHead onSortBy={onSortByMock} headers={headers} />,
      );

      act(() => {
        userEvent.click(getByRole('columnheader'));
      });

      expect(onSortByMock).not.toHaveBeenCalled();
    });

    it('should dispatch the onSortBy handler', () => {
      const headers: Cell[] = [{ children: 'Foo', sortable: true, sortLabel }];
      const onSortByMock = jest.fn();
      const { getByRole } = render(
        <TableHead onSortBy={onSortByMock} headers={headers} />,
      );

      act(() => {
        userEvent.click(getByRole('columnheader'));
      });

      expect(onSortByMock).toHaveBeenCalledTimes(1);
      expect(onSortByMock).toHaveBeenCalledWith(0);
    });
  });

  describe('onSortEnter', () => {
    it('should not dispatch the onSortEnter handler when the column is not sortable', () => {
      const headers = ['Foo'];
      const onSortEnterMock = jest.fn();
      const { getByRole } = render(
        <TableHead onSortEnter={onSortEnterMock} headers={headers} />,
      );

      act(() => {
        userEvent.hover(getByRole('columnheader'));
      });

      expect(onSortEnterMock).not.toHaveBeenCalled();
    });

    it('should dispatch the onSortEnter handler', () => {
      const headers: Cell[] = [{ children: 'Foo', sortable: true, sortLabel }];
      const onSortEnterMock = jest.fn();
      const { getByRole } = render(
        <TableHead onSortEnter={onSortEnterMock} headers={headers} />,
      );

      act(() => {
        userEvent.hover(getByRole('columnheader'));
      });

      expect(onSortEnterMock).toHaveBeenCalledTimes(1);
      expect(onSortEnterMock).toHaveBeenCalledWith(0);
    });
  });

  describe('onSortLeave', () => {
    it('should dispatch the onSortLeave handler', () => {
      const headers: Cell[] = [{ children: 'Foo', sortable: true, sortLabel }];
      const onSortLeaveMock = jest.fn();
      const { getByRole } = render(
        <TableHead onSortLeave={onSortLeaveMock} headers={headers} />,
      );

      act(() => {
        userEvent.unhover(getByRole('columnheader'));
      });

      expect(onSortLeaveMock).toHaveBeenCalledTimes(1);
      expect(onSortLeaveMock).toHaveBeenCalledWith(0);
    });

    it('should not dispatch the onSortLeave handler when the column is not sortable', () => {
      const headers = ['Foo'];
      const onSortLeaveMock = jest.fn();
      const { getByRole } = render(
        <TableHead onSortLeave={onSortLeaveMock} headers={headers} />,
      );

      act(() => {
        userEvent.unhover(getByRole('columnheader'));
      });

      expect(onSortLeaveMock).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <TableHead rowHeaders headers={fixtureHeaders} />,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
