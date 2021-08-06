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

import { CircleMore } from '@sumup/icons';
import { KeyboardEvent, MouseEvent } from 'react';

import {
  axe,
  render,
  renderToHtml,
  userEvent,
} from '../../../../util/test-utils';

import { UtilityLinks } from './UtilityLinks';

describe('UtilityLinks', () => {
  const baseProps = {
    links: [
      {
        icon: CircleMore,
        label: 'More',
        href: '/more',
        onClick: jest.fn((event: MouseEvent | KeyboardEvent) => {
          event.preventDefault();
        }),
      },
    ],
  };

  describe('styles', () => {
    it('should match the snapshot', () => {
      const { container } = render(<UtilityLinks {...baseProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should call the onClick handler of a link', () => {
      const { getByText } = render(<UtilityLinks {...baseProps} />);

      const link = baseProps.links[0];

      userEvent.click(getByText(link.label));

      expect(link.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<UtilityLinks {...baseProps} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
