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
import { IconProps, More } from '@sumup/icons';
import { KeyboardEvent, MouseEvent, FC } from 'react';

import { axe, render, userEvent, screen } from '../../../../util/test-utils.js';

import { UtilityLinks } from './UtilityLinks.js';

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
    ],
  };

  it('should call the onClick handler of a link', async () => {
    render(<UtilityLinks {...baseProps} />);

    const link = baseProps.links[0];

    await userEvent.click(screen.getByText(link.label));

    expect(link.onClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<UtilityLinks {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
