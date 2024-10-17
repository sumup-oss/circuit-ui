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

import { describe, expect, it, vi } from 'vitest';
import { createRef, type FC } from 'react';
import { SumUpCard, type IconProps } from '@sumup-oss/icons';

import {
  render,
  axe,
  userEvent,
  screen,
  type RenderFn,
} from '../../util/test-utils.js';
import { Body } from '../Body/index.js';
import { Badge } from '../Badge/index.js';

import { ListItem, type ListItemProps } from './ListItem.js';

describe('ListItem', () => {
  function renderListItem<T>(renderFn: RenderFn<T>, props: ListItemProps) {
    return renderFn(<ListItem {...props} />);
  }

  const baseProps = {
    label: 'Label',
  };

  it('should render a ListItem with a leading icon', () => {
    const { container } = renderListItem(render, {
      ...baseProps,
      leadingComponent: SumUpCard,
    });
    expect(container.querySelector('svg')).toBeVisible();
  });

  it('should render a ListItem with a custom leading component', () => {
    renderListItem(render, {
      ...baseProps,
      leadingComponent: (
        <Badge variant="danger" circle>
          3
        </Badge>
      ),
    });
    expect(screen.getByText('3')).toBeVisible();
  });

  it('should render a ListItem with a custom label', () => {
    renderListItem(render, {
      ...baseProps,
      label: <Body size="m">Label</Body>,
    });
    expect(screen.getByText('Label')).toBeVisible();
  });

  it('should render a ListItem with a details line', () => {
    renderListItem(render, {
      ...baseProps,
      details: 'Details',
    });
    expect(screen.getByText('Details')).toBeVisible();
  });

  it('should render a ListItem with a custom details line', () => {
    renderListItem(render, {
      ...baseProps,
      details: <Body size="s">Details</Body>,
    });
    expect(screen.getByText('Details')).toBeVisible();
  });

  it('should render a ListItem with a trailing label', () => {
    renderListItem(render, {
      ...baseProps,
      trailingLabel: 'Trailing label',
    });
    expect(screen.getByText('Trailing label')).toBeVisible();
  });

  it('should render a ListItem with a custom trailing label', () => {
    renderListItem(render, {
      ...baseProps,
      trailingLabel: (
        <Body size="m" weight="bold">
          Trailing label
        </Body>
      ),
    });
    expect(screen.getByText('Trailing label')).toBeVisible();
  });

  it('should render a ListItem with trailing details', () => {
    renderListItem(render, {
      ...baseProps,
      trailingLabel: 'Trailing label',
      trailingDetails: 'Trailing details',
    });
    expect(screen.getByText('Trailing label')).toBeVisible();
    expect(screen.getByText('Trailing details')).toBeVisible();
  });

  it('should render a ListItem with custom trailing details', () => {
    renderListItem(render, {
      ...baseProps,
      trailingLabel: 'Trailing label',
      trailingDetails: (
        <Body size="s" color="subtle">
          Trailing details
        </Body>
      ),
    });
    expect(screen.getByText('Trailing label')).toBeVisible();
    expect(screen.getByText('Trailing details')).toBeVisible();
  });

  it('should render a ListItem with a custom trailing component', () => {
    renderListItem(render, {
      ...baseProps,
      trailingComponent: <Badge variant="promo">Promo</Badge>,
    });
    expect(screen.getByText('Promo')).toBeVisible();
  });

  it('should render a selected ListItem', () => {
    renderListItem(render, {
      ...baseProps,
      selected: true,
      href: '/',
    });
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'true');
  });

  it('should render a disabled ListItem', () => {
    renderListItem(render, {
      ...baseProps,
      disabled: true,
      onClick: vi.fn(),
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  describe('business logic', () => {
    it('should render as a link when the href prop is passed', () => {
      renderListItem(render, {
        ...baseProps,
        href: 'https://sumup.com',
      });
      expect(screen.getByRole('link')).toBeVisible();
    });

    it('should render as a button when the onClick prop is passed', () => {
      renderListItem(render, {
        ...baseProps,
        onClick: vi.fn(),
      });
      expect(screen.getByRole('button')).toBeVisible();
    });

    it('should call the onClick handler when clicked', async () => {
      const props = {
        ...baseProps,
        onClick: vi.fn(),
      };
      renderListItem(render, props);

      await userEvent.click(screen.getByRole('button'));

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should forward a ref', () => {
      const ref = createRef<any>();
      const { container } = render(<ListItem {...baseProps} ref={ref} />);
      const listItem = container.firstChild;
      expect(ref.current).toBe(listItem);
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderListItem(render, {
      ...baseProps,
      variant: 'navigation',
      leadingComponent: SumUpCard as FC<IconProps>,
      details: 'Details',
      trailingLabel: 'Trailing label',
      trailingDetails: 'Trailing details',
      onClick: vi.fn(),
    });
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
