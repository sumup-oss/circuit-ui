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

import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';
import { createRef } from 'react';

import { axe, render, screen, userEvent } from '../../util/test-utils.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import {
  ComparisonTable,
  type ComparisonTableProps,
} from './ComparisonTable.js';
import {
  bankingBasicsSection,
  moneyManagement,
  invoicingSection,
  posPlan,
  posPlusPlan,
  posProPlan,
  productCatalogSection,
} from './fixtures.js';

vi.mock('../../hooks/useMedia/index.js');

const baseProps: ComparisonTableProps = {
  caption: 'Compare plans',
  headers: [posPlan, posPlusPlan, posProPlan],

  sections: [
    bankingBasicsSection,
    productCatalogSection,
    moneyManagement,
    invoicingSection,
  ],
  showAllFeaturesLabel: 'Show all features',
  selectSecondPlanLabel: 'Select a second plan',
  selectFirstPlanLabel: 'Select a first plan',
};

describe('ComparisonTable', () => {
  beforeEach(() => {
    (useMedia as Mock).mockReturnValue(false);
  });

  it('should forward the ref to the table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(<ComparisonTable {...baseProps} ref={ref} />);
    expect(screen.getByRole('table')).toBe(ref.current);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(
      <ComparisonTable
        {...baseProps}
        className={className}
        data-testid="comparison-table"
      />,
    );
    const anchor = screen.getByTestId('comparison-table');
    expect(anchor?.className).toContain(className);
  });

  describe('on narrow viewports', () => {
    beforeEach(() => {
      (useMedia as Mock).mockReturnValue(true);
    });
    afterEach(() => {
      (useMedia as Mock).mockReturnValue(false);
    });

    it('should render the plan picker on mobile', () => {
      render(<ComparisonTable {...baseProps} />);
      expect(screen.getByText(baseProps.selectFirstPlanLabel)).toBeVisible();
      expect(screen.getByText(baseProps.selectSecondPlanLabel)).toBeVisible();
    });

    it('should not render the plan picker on mobile if only given two plans', () => {
      render(
        <ComparisonTable {...baseProps} headers={[posPlan, posPlusPlan]} />,
      );
      expect(
        screen.queryByText(baseProps.selectFirstPlanLabel),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(baseProps.selectSecondPlanLabel),
      ).not.toBeInTheDocument();
    });

    it('should update displayed plans when a new plan is picked', async () => {
      render(<ComparisonTable {...baseProps} />);

      await userEvent.selectOptions(
        screen.getByLabelText(baseProps.selectFirstPlanLabel),
        'POS Pro',
      );
      expect(
        screen.getByRole('columnheader', {
          name: 'POS plus $15/month Join now',
        }),
      ).toBeVisible();
    });
  });

  describe('it should be sufficiently labeled', () => {
    beforeEach(() => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      process.env.NODE_ENV = 'test';
      vi.restoreAllMocks();
    });

    it('should throw accessibility error when the showAllFeaturesLabel prop is missing', () => {
      const props = {
        ...baseProps,
        showAllFeaturesLabel: undefined,
      } as unknown as ComparisonTableProps;
      // Silence the console.error output and switch to development mode to throw the error

      expect(() => render(<ComparisonTable {...props} />)).toThrow();
    });

    it('should throw accessibility error when the caption prop is missing', () => {
      const props = {
        ...baseProps,
        caption: undefined,
      } as unknown as ComparisonTableProps;
      // Silence the console.error output and switch to development mode to throw the error

      expect(() => render(<ComparisonTable {...props} />)).toThrow();
    });

    it('should throw accessibility error when the selectFirstPlanLabel prop is missing', () => {
      const props = {
        ...baseProps,
        selectFirstPlanLabel: undefined,
      } as unknown as ComparisonTableProps;
      // Silence the console.error output and switch to development mode to throw the error

      expect(() => render(<ComparisonTable {...props} />)).toThrow();
    });

    it('should throw accessibility error when the selectSecondPlanLabel prop is missing', () => {
      const props = {
        ...baseProps,
        selectSecondPlanLabel: undefined,
      } as unknown as ComparisonTableProps;
      // Silence the console.error output and switch to development mode to throw the error

      expect(() => render(<ComparisonTable {...props} />)).toThrow();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ComparisonTable {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
