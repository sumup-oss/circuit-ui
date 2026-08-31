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

import { render, screen } from '../../../../util/test-utils.js';

import type { TierIndicatorProps } from '../../../TierIndicator/TierIndicator.js';

import { Tab } from './Tab.js';
import { AccessibilityError } from '../../../../util/errors.js';

declare const process: {
  env: { NODE_ENV: string };
};

describe('Tab', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Tab className={className} />);
    const element = screen.getByRole('tab');
    expect(element.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Tab ref={ref} />);
    const tab = screen.getByRole('tab');
    expect(ref.current).toBe(tab);
  });

  it('should render with tab semantics', () => {
    const { rerender } = render(<Tab>Tab title</Tab>);
    expect(screen.getByText('Tab title')).toHaveRole('tab');
    expect(screen.getByText('Tab title')).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByText('Tab title')).toHaveAttribute('tabindex', '-1');
    rerender(<Tab selected>Tab title</Tab>);
    expect(screen.getByText('Tab title')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Tab title')).not.toHaveAttribute('tabindex');
  });

  it('should render with listitem semantics', () => {
    const { rerender } = render(<Tab as="listitem">Tab title</Tab>);
    expect(screen.getByText('Tab title').parentElement).toHaveRole('listitem');
    expect(screen.getByText('Tab title')).not.toHaveAttribute('aria-selected');
    expect(screen.getByText('Tab title')).not.toHaveAttribute('tabindex');
    rerender(
      <Tab as="listitem" selected>
        Tab title
      </Tab>,
    );
    expect(screen.getByText('Tab title')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('should render a trailing component, always at size s', () => {
    const TrailingComponent = vi.fn((_props: TierIndicatorProps) => null);
    render(<Tab trailingComponent={TrailingComponent}>Services</Tab>);
    expect(screen.getByText('Services')).toBeVisible();
    const [props] = TrailingComponent.mock.calls[0];
    expect(props).toStrictEqual({ variant: 'plus', size: 's' });
  });

  const requiredAccessibilityProps = {
    id: 'tab-id',
    'aria-controls': 'tab-id',
    onClick: vi.fn(),
    onKeyDown: vi.fn(),
  };
  it.each([
    'id',
    'aria-controls',
    'onClick',
    'onKeyDown',
  ])('[Accessibility props] should throw an error when the "%s" prop is missing', (prop) => {
    const consoleSpy = vi.spyOn(console, 'warn');
    consoleSpy.mockImplementation(() => {});

    const testProps = {
      ...requiredAccessibilityProps,
      [prop]: undefined,
    };
    process.env.NODE_ENV = 'development';
    render(
      <Tab as="tab" {...testProps}>
        Tab title
      </Tab>,
    );
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(AccessibilityError));
    process.env.NODE_ENV = 'test';
  });
});
