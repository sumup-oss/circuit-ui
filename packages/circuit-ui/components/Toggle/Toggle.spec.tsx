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

import { render, screen, axe, userEvent } from '../../util/test-utils';

import { Toggle } from './Toggle';

const defaultProps = {
  label: 'Label',
  description: 'A longer explanation',
};

describe('Toggle', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Toggle {...defaultProps} className={className} />,
    );
    const element = container.querySelector('div');
    expect(element?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(<Toggle {...defaultProps} ref={ref} />);
    const button = container.querySelector('button');
    expect(ref.current).toBe(button);
  });

  it('should call the change handler when toggled', async () => {
    const onChange = vi.fn();
    render(<Toggle {...defaultProps} onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should accept a custom description via aria-describedby', () => {
    const customDescription = 'Custom description';
    const customDescriptionId = 'customDescriptionId';
    render(
      <>
        <span id={customDescriptionId}>{customDescription}</span>
        <Toggle aria-describedby={customDescriptionId} {...defaultProps} />,
      </>,
    );
    const toggleEl = screen.getByRole('switch');

    expect(toggleEl).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining(customDescriptionId),
    );
    expect(toggleEl).toHaveAccessibleDescription(
      `${customDescription} ${defaultProps.description}`,
    );
  });

  // See https://inclusive-components.design/toggle-button/
  it('should have no accessibility violations', async () => {
    const { container } = render(<Toggle {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
