/**
 * Copyright 2025, SumUp Ltd.
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

import type { FC } from 'react';
import { Download, type IconProps } from '@sumup-oss/icons';
import { describe, expect, it, vi } from 'vitest';

import { render, userEvent, type RenderFn } from '../../../util/test-utils.js';
import type { ClickEvent } from '../../../types/events.js';

import { PopoverItem, type PopoverItemProps } from './PopoverItem.js';

describe('PopoverItem', () => {
  function renderPopoverItem<T>(
    renderFn: RenderFn<T>,
    props: PopoverItemProps,
  ) {
    return renderFn(<PopoverItem {...props} />);
  }

  const baseProps = {
    children: 'PopoverItem',
    icon: Download as FC<IconProps>,
  };

  describe('Styles', () => {
    it('should render as Link when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: vi.fn(),
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      expect(anchorEl).toBeVisible();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: vi.fn() };
      const { container } = renderPopoverItem(render, props);
      const buttonEl = container.querySelector('button');
      expect(buttonEl).toBeVisible();
    });
  });

  describe('Logic', () => {
    it('should call onClick when rendered as Link', async () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: vi.fn((event: ClickEvent) => {
          event.preventDefault();
        }),
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      if (anchorEl) {
        await userEvent.click(anchorEl);
      }
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
