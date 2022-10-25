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

import { act, axe, render } from '../../../../util/test-utils';
import { PopoverProps } from '../../../Popover';

import { ProfileMenu } from './ProfileMenu';

describe('ProfileMenu', () => {
  const baseProps = {
    user: { name: 'Jane Doe' },
    label: 'Open profile menu',
    actions: [
      {
        onClick: jest.fn(),
        children: 'View profile',
      },
      {
        onClick: jest.fn(),
        children: 'Settings',
      },
      { type: 'divider' },
      {
        onClick: jest.fn(),
        children: 'Logout',
        destructive: true,
      },
    ] as PopoverProps['actions'],
  };

  describe('Styles', () => {
    it('should render with a profile picture', () => {
      const { container } = render(
        <ProfileMenu
          {...baseProps}
          user={{ ...baseProps.user, avatar: { src: 'profile.png', alt: '' } }}
        />,
      );

      expect(container).toMatchSnapshot();
    });

    it('should render without a profile picture', () => {
      const { container } = render(<ProfileMenu {...baseProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('Accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<ProfileMenu {...baseProps} />);

      await act(async () => {
        const actual = await axe(container);
        expect(actual).toHaveNoViolations();
      });
    });
  });
});
