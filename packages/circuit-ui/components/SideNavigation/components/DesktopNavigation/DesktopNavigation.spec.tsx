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

/* eslint-disable react/display-name */
import { House, ShoppingBag } from '@sumup/icons';

import { create, render, axe, RenderFn } from '../../../../util/test-utils';

import { DesktopNavigation, DesktopNavigationProps } from './DesktopNavigation';

describe('DesktopNavigation', () => {
  function renderDesktopNavigation<T>(
    renderFn: RenderFn<T>,
    props: DesktopNavigationProps,
  ) {
    return renderFn(<DesktopNavigation {...props} />);
  }

  const baseProps = {
    primaryNavigationLabel: 'Primary',
    secondaryNavigationLabel: 'Secondary',
  };

  const defaultProps = {
    ...baseProps,
    primaryLinks: [
      {
        icon: (iconProps) => <ShoppingBag {...iconProps} size="large" />,
        label: 'Shop',
        href: '/shop',
        onClick: jest.fn(),
        isActive: true,
        secondaryGroups: [
          {
            label: 'For Kids',
            secondaryLinks: [
              {
                label: 'Toys',
                href: '/shop/toys',
                onClick: jest.fn(),
              },
              {
                label: 'Books',
                href: '/shop/books',
                onClick: jest.fn(),
              },
            ],
          },
        ],
      },
    ],
  };

  describe('styles', () => {
    it('should render with secondary links', () => {
      const wrapper = renderDesktopNavigation(create, defaultProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render without secondary links', () => {
      const props = {
        ...baseProps,
        primaryLinks: [
          {
            icon: (iconProps) => <House {...iconProps} size="large" />,
            label: 'Home',
            href: '/',
            onClick: jest.fn(),
          },
        ],
      };
      const wrapper = renderDesktopNavigation(create, props);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderDesktopNavigation(render, defaultProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
