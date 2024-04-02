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

import type { KeyboardEvent, MouseEvent, FC } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { More, type IconProps } from '@sumup/icons';

import { axe, render, userEvent, screen } from '../../../../util/test-utils.js';

import { UtilityLinks, type UtilityLinkProps } from './UtilityLinks.js';

describe('UtilityLinks', () => {
  const baseProps = {
    links: [
      {
        icon: More as FC<IconProps>,
        label: 'More',
        href: '/more',
        onClick: vi.fn((event: MouseEvent | KeyboardEvent) => {
          event.preventDefault();
        }),
      },
      {
        key: 'custom',
        children: <More data-testid="custom-component" />,
      },
    ],
  };

  it('should call the onClick handler of a link', async () => {
    render(<UtilityLinks {...baseProps} />);

    const link = baseProps.links[0] as UtilityLinkProps;

    await userEvent.click(screen.getByText(link.label));

    expect(link.onClick).toHaveBeenCalledTimes(1);
  });

  it('should render a custom component', () => {
    render(<UtilityLinks {...baseProps} />);

    expect(screen.getByTestId('custom-component')).toBeVisible();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<UtilityLinks {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
