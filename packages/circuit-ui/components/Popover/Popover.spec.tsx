/**
 * Copyright 2020, SumUp Ltd.
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

import { Zap } from '@sumup/icons';
import React from 'react';

import { create, renderToHtml, axe, RenderFn } from '../../util/test-utils';

import { PopoverItem, PopoverItemProps } from './Popover';

describe('PopoverItem', () => {
  function renderPopoverItem<T>(
    renderFn: RenderFn<T>,
    props: PopoverItemProps,
  ) {
    return renderFn(<PopoverItem {...props} />);
  }

  const baseProps = { children: 'PopoverItem' };

  describe('styles', () => {
    it('should render as Link when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
        icon: Zap,
      };
      const actual = renderPopoverItem(create, props);
      expect(actual).toMatchSnapshot();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: jest.fn(), icon: Zap };
      const actual = renderPopoverItem(create, props);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
        icon: Zap,
      };
      const wrapper = renderPopoverItem(renderToHtml, props);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
