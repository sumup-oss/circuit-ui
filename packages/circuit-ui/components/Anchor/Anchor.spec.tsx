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

import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { render, axe, userEvent, screen } from '../../util/test-utils';
import type { ClickEvent } from '../../types/events';

import { Anchor } from './Anchor';

describe('Anchor', () => {
  const baseProps = { children: 'Anchor' };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(
      <Anchor className={className} href="https://sumup.com">
        Anchor
      </Anchor>,
    );
    const anchor = screen.getByRole('link');
    expect(anchor?.className).toContain(className);
  });

  it('should forward a ref for a button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Anchor ref={ref} onClick={vi.fn()}>
        Anchor
      </Anchor>,
    );
    const button = screen.getByRole('button');
    expect(ref.current).toBe(button);
  });

  it('should forward a ref for a link', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Anchor ref={ref} href="https://sumup.com">
        Anchor
      </Anchor>,
    );
    const anchor = screen.getByRole('link');
    expect(ref.current).toBe(anchor);
  });

  it('should forward a ref for a span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Anchor ref={ref}>Anchor</Anchor>);
    const span = screen.getByText('Anchor');
    expect(ref.current).toBe(span);
  });

  it('should render as a `span` when neither href nor onClick is passed', () => {
    render(<Anchor {...baseProps} />);
    const actual = screen.getByText('Anchor');
    expect(actual.tagName).toBe('SPAN');
    expect(actual).toBeVisible();
  });

  it('should render as an `a` when an href (and onClick) is passed', () => {
    render(
      <Anchor {...baseProps} href="https://sumup.com" onClick={vi.fn()} />,
    );
    const actual = screen.getByText('Anchor');
    expect(actual.tagName).toBe('A');
    expect(actual).toBeVisible();
  });

  it('should render as a `button` when an onClick is passed', () => {
    render(<Anchor {...baseProps} onClick={vi.fn()} />);
    const actual = screen.getByText('Anchor');
    expect(actual.tagName).toBe('BUTTON');
    expect(actual).toBeVisible();
  });

  it('should call the onClick handler when rendered as a link', async () => {
    const onClick = vi.fn((event: ClickEvent) => {
      event.preventDefault(); // navigation is not implemented in jsdom
    });
    render(
      <Anchor {...baseProps} href="https://sumup.com" onClick={onClick} />,
    );

    await userEvent.click(screen.getByRole('link'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call the onClick handler when rendered as a button', async () => {
    const onClick = vi.fn();
    render(<Anchor {...baseProps} onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(
      <Anchor {...baseProps} href="https://sumup.com" onClick={vi.fn()} />,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
