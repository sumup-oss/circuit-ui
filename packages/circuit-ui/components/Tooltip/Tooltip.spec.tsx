/**
 * Copyright 2024, SumUp Ltd.
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

import { render, axe, screen, userEvent } from '../../util/test-utils.js';

import { Tooltip, type TooltipProps } from './Tooltip.js';

const label = 'Label';
const baseProps = {
  label,
  type: 'label',
  component: (props) => <button {...props} />,
} satisfies TooltipProps;

describe('Tooltip', () => {
  it('should merge a custom class name with the default ones', async () => {
    const className = 'foo';
    render(<Tooltip {...baseProps} className={className} />);
    await userEvent.hover(
      screen.getByRole('button', { name: baseProps.label }),
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip?.className).toContain(className);
  });

  it('should forward a ref to the tooltip', async () => {
    const ref = createRef<HTMLDivElement>();
    render(<Tooltip {...baseProps} ref={ref} />);
    await userEvent.hover(
      screen.getByRole('button', { name: baseProps.label }),
    );
    const tooltip = screen.getByRole('tooltip');
    expect(ref.current).toBe(tooltip);
  });

  it('should act as a label for the reference element', () => {
    render(<Tooltip {...baseProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName(baseProps.label);
  });

  it('should act as a description for the reference element', () => {
    render(<Tooltip {...baseProps} type="description" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleDescription(baseProps.label);
  });

  it('should be initially closed', async () => {
    render(<Tooltip {...baseProps} />);
    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should be open when the reference element is focused', async () => {
    render(<Tooltip {...baseProps} />);

    await userEvent.tab();

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-state', 'open');
  });

  it('should be open when the reference element is hovered', async () => {
    render(<Tooltip {...baseProps} />);
    const button = screen.getByRole('button');

    await userEvent.hover(button);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-state', 'open');
  });

  it('should stay open when the tooltip element is hovered', async () => {
    render(<Tooltip {...baseProps} />);
    await userEvent.hover(
      screen.getByRole('button', { name: baseProps.label }),
    );
    const button = screen.getByRole('button');
    const tooltip = screen.getByRole('tooltip');

    await userEvent.hover(button);
    await userEvent.hover(tooltip);

    expect(tooltip).toHaveAttribute('data-state', 'open');
  });

  it('should close when the escape key is pressed', async () => {
    render(<Tooltip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.tab();
    const tooltip = screen.getByRole('tooltip');

    await userEvent.hover(button);

    expect(tooltip).toHaveAttribute('data-state', 'open');

    await userEvent.keyboard('{Escape}');

    expect(tooltip).toHaveAttribute('data-state', 'closed');
  });

  it('should close when another tooltip is opened', async () => {
    render(
      <>
        <Tooltip {...baseProps} label="Tooltip1" />
        <Tooltip {...baseProps} label="Tooltip2" />
      </>,
    );
    await userEvent.tab();

    const tooltipGroup = screen.getAllByRole('tooltip');
    expect(tooltipGroup.length).toBe(1);
    const [tooltip] = tooltipGroup;
    expect(tooltip).toHaveTextContent('Tooltip1');

    await userEvent.tab();
    const secondTooltipGroup = screen.getAllByRole('tooltip');
    expect(secondTooltipGroup.length).toBe(1);
    const [tooltip2] = secondTooltipGroup;
    expect(tooltip2).toHaveTextContent('Tooltip2');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Tooltip {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
