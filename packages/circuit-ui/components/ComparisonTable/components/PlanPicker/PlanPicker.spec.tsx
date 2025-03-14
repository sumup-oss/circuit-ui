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

import { describe, expect, it, vi } from 'vitest';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';

import { PlanPicker, type PlanPickerProps } from './PlanPicker.js';

const onPlanSelectSpy = vi.fn();
const baseProps: PlanPickerProps = {
  plans: [
    {
      value: 1,
      label: 'Plan 1',
    },
    {
      value: 2,
      label: 'Plan 2',
    },
    {
      value: 3,
      label: 'Plan 3',
    },
    {
      value: 4,
      label: 'Plan 4',
    },
  ],
  selectedPlans: [1, 2],
  onPlanSelect: onPlanSelectSpy,
  selectFirstPlanLabel: 'Select first plan',
  selectSecondPlanLabel: 'Select second plan',
};

describe('PlanPicker', () => {
  it('should render correctly', async () => {
    render(<PlanPicker {...baseProps} />);
    const firstSelect = screen.getByLabelText(baseProps.selectFirstPlanLabel);
    const secondSelect = screen.getByLabelText(baseProps.selectSecondPlanLabel);
    expect(firstSelect).toBeVisible();
    expect(secondSelect).toBeVisible();
    expect(firstSelect.value).toBe('1');
    expect(secondSelect.value).toBe('2');
  });
  it('should fire onPlanSelect when user selects plans', async () => {
    render(<PlanPicker {...baseProps} />);
    const [firstSelect, secondSelect] = screen.getAllByRole('combobox');
    await userEvent.selectOptions(firstSelect, '4');
    expect(onPlanSelectSpy).toHaveBeenCalledWith([4, 2]);
    await userEvent.selectOptions(secondSelect, '3');
    expect(onPlanSelectSpy).toHaveBeenCalledWith([1, 3]);
  });

  it('should disable options that are already selected', async () => {
    render(<PlanPicker {...baseProps} selectedPlans={[1, 2]} />);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, plan1] = screen.getAllByRole('option', {
      name: 'Plan 1',
    });
    const [plan2] = screen.getAllByRole('option', {
      name: 'Plan 2',
    });
    const [firstSelect, secondSelect] = screen.getAllByRole('combobox');

    expect(secondSelect).toContainElement(plan1);
    expect(plan1).toBeDisabled();

    expect(firstSelect).toContainElement(plan2);
    expect(plan2).toBeDisabled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PlanPicker {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
