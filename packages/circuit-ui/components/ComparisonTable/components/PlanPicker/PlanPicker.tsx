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

'use client';

import { type ChangeEvent, type HTMLAttributes, useCallback } from 'react';

import { Select, type SelectOption } from '../../../Select/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './PlanPicker.module.css';

export interface PlanPickerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A list of plans to choose from.
   */
  plans: SelectOption[];
  /**
   * An array of the two ids of the currently selected plans.
   * the first index is the first plan, the second index is the second plan.
   */
  selectedPlans: string[];
  /**
   * Callback when a plan is selected.
   */
  onPlanSelect: (plans: string[]) => void;
  /**
   * The label for the first plan selector.
   */
  selectFirstPlanLabel: string;
  /**
   * The label for the second plan selector.
   */
  selectSecondPlanLabel: string;
}

export const PlanPicker = ({
  plans,
  selectedPlans,
  onPlanSelect,
  className,
  selectFirstPlanLabel,
  selectSecondPlanLabel,
  ...props
}: PlanPickerProps) => {
  const handleSelectPlan = useCallback(
    (index: number) => (event: ChangeEvent<HTMLSelectElement>) => {
      const newSelectedPlans = [...selectedPlans];
      newSelectedPlans[index] = event.target.value;
      onPlanSelect(newSelectedPlans);
    },
    [onPlanSelect, selectedPlans],
  );

  const handleSelectFirstPlan = handleSelectPlan(0);
  const handleSelectSecondPlan = handleSelectPlan(1);
  return (
    <div className={clsx(classes.base, className)} {...props}>
      <Select
        className={classes.select}
        hideLabel
        label={selectFirstPlanLabel}
        options={plans.map((plan) => ({
          ...plan,
          disabled: plan.value === selectedPlans[1],
        }))}
        value={selectedPlans[0]}
        onChange={handleSelectFirstPlan}
      />
      <Select
        className={classes.select}
        hideLabel
        label={selectSecondPlanLabel}
        options={plans.map((plan) => ({
          ...plan,
          disabled: plan.value === selectedPlans[0],
        }))}
        value={selectedPlans[1]}
        onChange={handleSelectSecondPlan}
      />
    </div>
  );
};
