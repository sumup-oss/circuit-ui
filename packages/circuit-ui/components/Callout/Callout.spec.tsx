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

import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import type { IconProps } from '@sumup-oss/icons';

import { axe, render, screen } from '../../util/test-utils.js';

import { Callout, type CalloutProps } from './Callout.js';

describe('Callout', () => {
  const renderCallout = (props: CalloutProps) => render(<Callout {...props} />);

  const baseProps: CalloutProps = {
    body: 'This is a callout',
  };

  it('should render the callout', () => {
    renderCallout(baseProps);

    expect(screen.getByText('This is a callout')).toBeVisible();
  });

  it('should render a custom icon', () => {
    const CustomIcon = (props: IconProps) => (
      <svg {...props} data-testid="custom-icon" />
    );

    renderCallout({ ...baseProps, icon: CustomIcon });

    const icon = screen.getByTestId('custom-icon');

    expect(icon).toBeInTheDocument();
  });

  it('should render the icon label visually hidden', () => {
    renderCallout({ ...baseProps, iconLabel: 'Information' });

    expect(screen.getByText('Information')).toBeInTheDocument();
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Callout ref={ref} {...baseProps} />);

    expect(ref.current).toBe(container.firstChild);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderCallout(baseProps);
    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });
});
