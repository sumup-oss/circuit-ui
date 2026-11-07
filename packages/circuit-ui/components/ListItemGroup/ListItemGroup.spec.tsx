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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import {
  screen,
  render,
  fireEvent,
  userEvent,
  act,
  axe,
  type RenderFn,
} from '../../util/test-utils.js';
import { Body } from '../Body/index.js';

import { ListItemGroup, type ListItemGroupProps } from './ListItemGroup.js';
import classes from './ListItemGroup.module.css';

declare const process: {
  env: { NODE_ENV: string };
};

describe('ListItemGroup', () => {
  function renderListItemGroup<T>(
    renderFn: RenderFn<T>,
    props: ListItemGroupProps,
  ) {
    return renderFn(<ListItemGroup {...props} />);
  }

  const items = [
    { id: 1, label: 'First item' },
    { id: 2, label: 'Second item' },
    { id: 3, label: 'Third item' },
  ];

  const baseProps = {
    items: items.map((item) => ({
      key: item.id,
      label: item.label,
    })),
    label: 'Group label',
  };

  it('should render a ListItemGroup with a custom label', () => {
    renderListItemGroup(render, {
      ...baseProps,
      label: (
        <Body as="h4" size="s">
          Group label
        </Body>
      ),
    });
    expect(screen.getByText('Group label')).toBeVisible();
  });

  it('should render a ListItemGroup with aria-label', () => {
    renderListItemGroup(render, {
      ...baseProps,
      label: undefined,
      'aria-label': 'Group label',
    });
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render a ListItemGroup with a details line', () => {
    renderListItemGroup(render, {
      ...baseProps,
      details: 'Group details',
    });
    expect(screen.getByText('Group details')).toBeVisible();
  });

  it('should render a ListItemGroup with a custom details line', () => {
    renderListItemGroup(render, {
      ...baseProps,
      details: <Body size="s">Group details</Body>,
    });
    expect(screen.getByText('Group details')).toBeVisible();
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<ListItemGroup {...baseProps} ref={ref} />);
    const listItemGroup = container.firstChild;
    expect(ref.current).toBe(listItemGroup);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderListItemGroup(render, {
      ...baseProps,
      label: 'Group label',
      details: 'Group details',
    });
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('scrolling', () => {
    let viewportHeight: number;
    let itemsHeight: number;

    beforeEach(() => {
      viewportHeight = 100;
      itemsHeight = 300;
      vi.stubGlobal('ResizeObserver', undefined);
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(
        function (this: HTMLElement) {
          return this.tagName === 'UL' ? itemsHeight : viewportHeight;
        },
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.unstubAllGlobals();
    });

    it.each([
      'plain',
      'inset',
    ] as const)('should fade overflowing %s items until the end is reached', (variant) => {
      const { container } = render(
        <ListItemGroup {...baseProps} variant={variant} maxHeight={100} />,
      );
      const viewport = screen.getByRole('list').parentElement as HTMLDivElement;
      const fade = () => container.querySelector(`.${classes.fade}`);

      expect(viewport).toHaveStyle({ maxHeight: '100px' });
      expect(viewport).toHaveAttribute('tabindex', '0');
      expect(viewport).not.toContainElement(screen.getByText('Group label'));
      expect(fade()).toBeInTheDocument();

      fireEvent.scroll(viewport, { target: { scrollTop: 200 } });
      expect(fade()).not.toBeInTheDocument();

      fireEvent.scroll(viewport, { target: { scrollTop: 50 } });
      expect(fade()).toBeInTheDocument();
    });

    it('should update the fade when the items or viewport change size', () => {
      const { container } = render(
        <ListItemGroup {...baseProps} maxHeight="20rem" />,
      );
      const viewport = screen.getByRole('list').parentElement as HTMLDivElement;
      const fade = () => container.querySelector(`.${classes.fade}`);
      expect(viewport.style.maxHeight).toBe('20rem');
      expect(fade()).toBeInTheDocument();

      itemsHeight = 80;
      fireEvent(window, new Event('resize'));
      expect(fade()).not.toBeInTheDocument();
      expect(viewport).not.toHaveAttribute('tabindex');

      itemsHeight = 300;
      fireEvent(window, new Event('resize'));
      expect(fade()).toBeInTheDocument();

      viewportHeight = 400;
      fireEvent(window, new Event('resize'));
      expect(fade()).not.toBeInTheDocument();
    });

    it('should leave unconstrained lists without a fade or extra tab stop', () => {
      const { container } = render(<ListItemGroup {...baseProps} />);
      expect(
        container.querySelector(`.${classes.fade}`),
      ).not.toBeInTheDocument();
      expect(screen.getByRole('list').parentElement).not.toHaveAttribute(
        'tabindex',
      );
    });

    it('should update on observed resizes and disconnect on unmount', () => {
      const callbacks: (() => void)[] = [];
      const disconnect = vi.fn();
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(callback: () => void) {
            callbacks.push(callback);
          }
          observe = vi.fn();
          disconnect = disconnect;
        },
      );
      const { container, unmount } = render(
        <ListItemGroup {...baseProps} maxHeight={100} />,
      );
      const fade = () => container.querySelector(`.${classes.fade}`);
      expect(fade()).toBeInTheDocument();

      itemsHeight = 80;
      act(() => {
        for (const callback of callbacks) {
          callback();
        }
      });
      expect(fade()).not.toBeInTheDocument();

      viewportHeight = 50;
      act(() => {
        for (const callback of callbacks) {
          callback();
        }
      });
      expect(fade()).toBeInTheDocument();

      unmount();
      expect(disconnect).toHaveBeenCalledTimes(2);
    });

    it('should keep interactive items keyboard accessible', async () => {
      render(
        <ListItemGroup
          {...baseProps}
          maxHeight={100}
          items={baseProps.items.map((item) => ({ ...item, onClick: vi.fn() }))}
        />,
      );
      const buttons = screen.getAllByRole('button');
      await userEvent.tab();
      expect(buttons[0]).toHaveFocus();
      await userEvent.tab();
      expect(buttons[1]).toHaveFocus();
      await userEvent.tab();
      expect(buttons[2]).toHaveFocus();
      expect(screen.getByRole('list').parentElement).not.toHaveAttribute(
        'tabindex',
      );
    });
  });

  it('should throw accessibility error when there is no aria attribute or label', () => {
    const props = {
      ...baseProps,
      label: undefined,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-hidden': undefined,
    } as unknown as ListItemGroupProps;
    // Silence the console.error output and switch to development mode to throw the error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.NODE_ENV = 'development';
    expect(() => render(<ListItemGroup {...props} />)).toThrow();
    process.env.NODE_ENV = 'test';
    vi.restoreAllMocks();
  });
});
