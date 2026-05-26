/**
 * Copyright 2026, SumUp Ltd.
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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';
import type { IconProps } from '@sumup-oss/icons';

import { render, screen, axe } from '../../util/test-utils.js';

import { Status } from './Status.js';

describe('Status', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(
      <Status className={className} label="Status">
        Status
      </Status>,
    );
    expect(
      screen.getByText('Status', { selector: 'span > span' }).parentElement,
    ).toHaveClass(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Status ref={ref} label="Status">
        Status
      </Status>,
    );
    expect(ref.current).toBe(
      screen.getByText('Status', { selector: 'span > span' }).parentElement,
    );
  });

  it('should render a visually hidden label', () => {
    render(<Status label="Paid">Paid</Status>);
    expect(
      screen.getByText('Paid', { selector: 'span > span' }),
    ).toBeInTheDocument();
  });

  it('should not render children for the dot variant', () => {
    render(
      <Status variant="dot" color="confirm" label="Confirmed">
        hidden
      </Status>,
    );
    expect(screen.queryByText('hidden')).toBeNull();
  });

  it('should render the icon in the line variant', () => {
    render(
      <Status
        variant="line"
        icon={(props: IconProps) => <svg {...props} data-testid="icon" />}
        label="Status"
      >
        Status
      </Status>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should not render the icon outside the line variant', () => {
    render(
      <Status
        variant="pill"
        icon={(props: IconProps) => <svg {...props} data-testid="icon" />}
        label="Status"
      >
        Status
      </Status>,
    );
    expect(screen.queryByTestId('icon')).toBeNull();
  });

  describe('accessibility', () => {
    const variants = ['pill', 'line', 'badge', 'dot'] as const;
    const colors = [
      'confirm',
      'neutral',
      'notify',
      'alert',
      'promo',
      'special',
    ] as const;

    for (const variant of variants) {
      for (const color of colors) {
        it(`should meet accessibility guidelines for variant="${variant}" color="${color}"`, async () => {
          const { container } = render(
            <Status variant={variant} color={color} label="Status label">
              {variant !== 'dot' ? 'Status' : undefined}
            </Status>,
          );
          const actual = await axe(container);
          expect(actual).toHaveNoViolations();
        });
      }
    }
  });
});
