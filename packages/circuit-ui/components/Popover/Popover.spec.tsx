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

import { CirclePlus, Zap } from '@sumup/icons';
import { useRef } from 'react';
import { Placement } from '@popperjs/core';

import {
  create,
  renderToHtml,
  axe,
  RenderFn,
  render,
  userEvent,
} from '../../util/test-utils';

import {
  PopoverItem,
  PopoverItemProps,
  Popover,
  PopoverProps,
} from './Popover';

const placements: Placement[] = ['auto', 'top', 'bottom', 'left', 'right'];

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
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      expect(anchorEl).toBeVisible();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: jest.fn(), icon: Zap };
      const { container } = renderPopoverItem(render, props);
      const buttonEl = container.querySelector('button');
      expect(buttonEl).toBeVisible();
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

  describe('business logic', () => {
    it('should call onClick when rendered as Link', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
        icon: Zap,
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      if (anchorEl) {
        userEvent.click(anchorEl);
      }
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Popover', () => {
  const Default = (props: Omit<PopoverProps, 'triggerRef'>) => {
    const triggerRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

    return (
      <>
        <button ref={triggerRef}>Button</button>
        <Popover triggerRef={triggerRef} {...props} />
      </>
    );
  };

  const baseProps = {
    actions: [
      {
        onClick: () => alert('Hello'),
        children: 'Add',
        icon: CirclePlus,
      },
    ],
    isOpen: true,
    onClose: jest.fn(),
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Default {...baseProps} />);
      expect(actual).toMatchSnapshot();
    });

    placements.forEach((placement) => {
      it(`should render popover on ${placement}`, () => {
        const actual = create(<Default placement={placement} {...baseProps} />);
        expect(actual).toMatchSnapshot();
      });
    });
  });

  describe('business logic', () => {
    it('should close popover when passing a click outside', () => {
      const { queryByText } = render(<Default {...baseProps} />);
      expect(queryByText('Add')).not.toBeNull();

      userEvent.click(document.body);

      expect(baseProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('should close popover when passing a click to a reference element', () => {
      const { queryByText, getAllByRole } = render(<Default {...baseProps} />);
      expect(queryByText('Add')).not.toBeNull();

      userEvent.click(getAllByRole('button')[0]);

      expect(baseProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Default {...baseProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
