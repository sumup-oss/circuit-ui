/**
 * Copyright 2021, SumUp Ltd.
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
  act,
  axe,
  render,
  renderToHtml,
  userEvent,
} from '../../../../util/test-utils';

import { Hamburger } from './Hamburger';

describe('Hamburger', () => {
  const baseProps = {
    openLabel: 'Close menu',
    closedLabel: 'Open menu',
  };

  describe('styles', () => {
    it('should render with closed styles', () => {
      const { container } = render(<Hamburger {...baseProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should render with open styles', () => {
      const { container } = render(<Hamburger {...baseProps} isOpen />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should call the `onToggle` prop when clicked', () => {
      const onToggle = jest.fn();
      const { getByRole } = render(
        <Hamburger {...baseProps} onToggle={onToggle} />,
      );

      act(() => {
        userEvent.click(getByRole('button'));
      });

      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Hamburger {...baseProps} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
