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

import { forwardRef, useCallback, useState } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import {
  PlanPicker,
  type PlanPickerProps,
} from './components/PlanPicker/PlanPicker.js';
import {
  PlanTable,
  type PlanTableProps,
} from './components/PlanTable/PlanTable.js';
import classes from './ComparisonTable.module.css';

export interface ComparisonTableProps
  extends Omit<PlanTableProps, 'activePlans' | 'isCollapsed'>,
    Pick<PlanPickerProps, 'selectFirstPlanLabel' | 'selectSecondPlanLabel'> {}

export const ComparisonTable = forwardRef<
  HTMLTableElement,
  ComparisonTableProps
>(
  (
    {
      caption,
      sections,
      headers,
      showAllFeaturesLabel,
      selectFirstPlanLabel,
      selectSecondPlanLabel,
      className,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      if (!isSufficientlyLabelled(showAllFeaturesLabel)) {
        throw new AccessibilityError(
          'ComparisonTable',
          'The `showAllFeaturesLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(caption)) {
        throw new AccessibilityError(
          'ComparisonTable',
          'The `caption` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(selectFirstPlanLabel)) {
        throw new AccessibilityError(
          'ComparisonTable',
          'The `selectFirstPlanLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(selectSecondPlanLabel)) {
        throw new AccessibilityError(
          'ComparisonTable',
          'The `selectSecondPlanLabel` prop is missing or invalid.',
        );
      }
    }

    const [activePlans, setActivePlans] = useState([
      headers[0].id,
      headers[1].id,
    ]);

    const planOptions = headers.map((plan) => ({
      label: plan.title,
      value: plan.id,
    }));

    const onPlanSelect = useCallback((value: string[]) => {
      setActivePlans(value);
    }, []);

    return (
      <div className={clsx(classes.base, className)} {...props}>
        {headers.length >= 3 && (
          <PlanPicker
            className={classes.picker}
            plans={planOptions}
            selectedPlans={activePlans}
            onPlanSelect={onPlanSelect}
            selectSecondPlanLabel={selectSecondPlanLabel}
            selectFirstPlanLabel={selectFirstPlanLabel}
          />
        )}
        <PlanTable
          ref={ref}
          caption={caption}
          sections={sections}
          headers={headers}
          activePlans={[
            headers.findIndex(({ id }) => id === activePlans[0]),
            headers.findIndex(({ id }) => id === activePlans[1]),
          ]}
          showAllFeaturesLabel={showAllFeaturesLabel}
        />
      </div>
    );
  },
);
