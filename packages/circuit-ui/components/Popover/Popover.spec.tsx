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

/* eslint-disable react/display-name */

import { forwardRef, Ref } from 'react';
import { CirclePlus, Zap } from '@sumup/icons';
import { Placement } from '@popperjs/core';

import {
  renderToHtml,
  axe,
  RenderFn,
  render,
  userEvent,
  waitFor,
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
  const renderPopover = (props: Omit<PopoverProps, 'component'>) =>
    render(
      <Popover
        // eslint-disable-next-line @typescript-eslint/no-shadow
        component={forwardRef<HTMLElement>((props, ref) => {
          const buttonRef = ref as Ref<HTMLButtonElement>;
          return (
            <button ref={buttonRef} {...props}>
              Button
            </button>
          );
        })}
        {...props}
      />,
    );

  const baseProps = {
    actions: [
      {
        onClick: () => alert('Added'),
        children: 'Add',
        icon: CirclePlus,
      },
    ],
    isOpen: true,
    onClose: jest.fn(),
  };

  describe('styles', () => {
    it('should render with default styles', async () => {
      const { container, getByRole } = renderPopover(baseProps);

      const popoverTrigger = getByRole('button');

      userEvent.click(popoverTrigger);

      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });

    it.each(placements)(`should render popover on %s`, async (placement) => {
      const { container, getByRole } = renderPopover({
        ...baseProps,
        placement,
      });

      const popoverTrigger = getByRole('button');

      userEvent.click(popoverTrigger);

      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('business logic', () => {
    it('should close the popover when clicking outside', async () => {
      const { getByRole, queryByText } = renderPopover(baseProps);

      const popoverTrigger = getByRole('button');

      userEvent.click(popoverTrigger);

      await waitFor(() => {
        expect(queryByText(baseProps.actions[0].children)).toBeVisible();
      });

      userEvent.click(document.body);

      await waitFor(() => {
        expect(queryByText(baseProps.actions[0].children)).toBeNull();
      });
    });

    it('should close popover when clicking the trigger element', async () => {
      const { getByRole, queryByText } = renderPopover(baseProps);

      const popoverTrigger = getByRole('button');

      userEvent.click(popoverTrigger);

      await waitFor(() => {
        expect(queryByText(baseProps.actions[0].children)).toBeVisible();
      });

      userEvent.click(popoverTrigger);

      await waitFor(() => {
        expect(queryByText(baseProps.actions[0].children)).toBeNull();
      });
    });

    /**
     * Accessibility tests.
     */
    it('should meet accessibility guidelines', async () => {
      const { container, getByRole, queryByText } = renderPopover(baseProps);

      const popoverTrigger = getByRole('button');

      userEvent.click(popoverTrigger);

      await waitFor(() => {
        expect(queryByText(baseProps.actions[0].children)).toBeVisible();
      });

      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
