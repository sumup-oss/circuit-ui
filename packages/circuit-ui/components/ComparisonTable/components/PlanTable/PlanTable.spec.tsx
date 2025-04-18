/**
 * Copyright 2025, SumUp Ltd.
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

import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { createRef } from 'react';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';
import {
  essentialFeaturesSection,
  customizationSection,
  basicPlan,
  standardPlan,
} from '../../fixtures.js';

import { PlanTable, type PlanTableProps } from './PlanTable.js';

vi.mock('../../../../hooks/useMedia/index.js');

const baseProps: PlanTableProps = {
  caption: 'Plan comparison',
  showAllFeaturesLabel: 'Show all features',
  sections: [essentialFeaturesSection],
  headers: [basicPlan, standardPlan],
  activePlans: [0, 1],
};

describe('PlanTable', () => {
  beforeEach(() => {
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
    }));
    (useMedia as Mock).mockReturnValue(false);
  });

  it('should forward the ref to the table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(<PlanTable {...baseProps} ref={ref} />);
    expect(screen.getByRole('table')).toBe(ref.current);
  });

  it('should render all plan information', () => {
    render(<PlanTable {...baseProps} />);
    expect(screen.getByText(baseProps.caption)).toBeInTheDocument();
    expect(
      screen.getAllByRole('table', { name: baseProps.caption }),
    ).toHaveLength(1);
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(7);

    expect(
      screen.getAllByRole('rowheader', { name: 'Essential Features' }),
    ).toHaveLength(1);
    expect(screen.getAllByRole('rowheader')).toHaveLength(6);
    expect(screen.getAllByRole('cell', { name: 'included' })).toHaveLength(7);
    expect(screen.getAllByRole('cell', { name: 'not included' })).toHaveLength(
      3,
    );
  });

  it('should render as collapsed when content is large', async () => {
    render(
      <PlanTable
        {...baseProps}
        sections={[...baseProps.sections, customizationSection]}
      />,
    );
    const showAllFeaturesButton = screen.getByText(
      baseProps.showAllFeaturesLabel,
    );
    expect(showAllFeaturesButton).toBeVisible();
    expect(screen.getAllByRole('row')).toHaveLength(9);
    await userEvent.click(showAllFeaturesButton);
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('should only render two columns on mobile', () => {
    (useMedia as Mock).mockReturnValue(true);
    render(<PlanTable {...baseProps} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(
      screen.queryByRole('columnheader', {
        name: 'Premium Full feature set Get started',
      }),
    ).not.toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PlanTable {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
