/**
 * Copyright 2019, SumUp Ltd.
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
import { createRef } from 'react';

import { axe, render, userEvent, screen } from '../../util/test-utils.js';

import { Hamburger } from './Hamburger.js';

describe('Hamburger', () => {
  const baseProps = {
    activeLabel: 'Close menu',
    inactiveLabel: 'Open menu',
  };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Hamburger {...baseProps} className={className} />,
    );
    const hamburger = container.querySelector('button');
    expect(hamburger?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<any>();
    const { container } = render(<Hamburger {...baseProps} ref={ref} />);
    const hamburger = container.querySelector('button');
    expect(ref.current).toBe(hamburger);
  });

  it('should have the relevant aria attribute when active', () => {
    render(<Hamburger {...baseProps} isActive />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('should call the onClick prop when clicked', async () => {
    const onClick = vi.fn();
    render(
      <Hamburger {...baseProps} onClick={onClick} data-testid="hamburger" />,
    );

    await userEvent.click(screen.getByTestId('hamburger'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Hamburger {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
