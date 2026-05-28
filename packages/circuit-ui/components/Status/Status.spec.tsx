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
    const ref = createRef<HTMLDivElement>();
    render(
      <Status ref={ref} className={className}>
        Status
      </Status>,
    );
    expect(ref.current).toHaveClass(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Status ref={ref}>Status</Status>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should render a visually hidden children for the dot variant', () => {
    render(
      <Status variant="dot" color="confirm">
        Confirmed
      </Status>,
    );
    expect(
      screen.getByText('Confirmed', { selector: 'span' }),
    ).toBeInTheDocument();
  });

  it('should render the icon in the line variant', () => {
    render(
      <Status
        variant="line"
        icon={(props: IconProps) => <svg {...props} data-testid="icon" />}
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
      >
        Status
      </Status>,
    );
    expect(screen.queryByTestId('icon')).toBeNull();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Status>Status</Status>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
