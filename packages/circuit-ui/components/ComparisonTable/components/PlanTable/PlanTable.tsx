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

import {
  forwardRef,
  type HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Plus } from '@sumup-oss/icons';

import { utilClasses } from '../../../../styles/utility.js';
import {
  TableHeader,
  type TableHeaderProps,
} from '../TableHeader/TableHeader.js';
import { FeatureRow, type FeatureRowProps } from '../TableRow/FeatureRow.js';
import { generateFromIndex, getFirstEightRows } from '../../utils.js';
import { Button } from '../../../Button/index.js';
import { applyMultipleRefs } from '../../../../util/refs.js';
import { throttle } from '../../../../util/helpers.js';
import { Compact } from '../../../Compact/index.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';
import { Body } from '../../../Body/index.js';

import classes from './PlanTable.module.css';

export interface FeatureSection {
  title: string;
  features: FeatureRowProps[];
}

export interface PlanTableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * A descriptive caption for the table.
   */
  caption: string;
  /**
   * The label for the show all features button.
   */
  showAllFeaturesLabel: string;
  /**
   * A list of sections with features to display.
   */
  sections: FeatureSection[];
  /**
   * A list of plans to compare.
   */
  plans: TableHeaderProps[];
  /**
   * An array of the two positions of the currently selected plans.
   * the first index is the first plan, the second index is the second plan.
   */
  activePlans: number[];
}

export const PlanTable = forwardRef<HTMLTableElement, PlanTableProps>(
  (
    { caption, showAllFeaturesLabel, plans, sections, activePlans, ...props },
    ref,
  ) => {
    const tableRef = useRef<HTMLTableElement>(null);
    const isMobile = useMedia('(max-width: 767px)');
    const [isCollapsed, setIsCollapsed] = useState(
      sections.reduce(
        (totalRows, section) => totalRows + section.features.length + 1,
        0,
      ) > 8,
    );
    const theadRef = useRef<HTMLTableSectionElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const rowsToDisplay = isCollapsed ? getFirstEightRows(sections) : sections;

    const updateHeaderHeight = useCallback(() => {
      throttle(() => {
        setHeaderHeight(theadRef.current?.getBoundingClientRect().height ?? 0);
      }, 500)();
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: we want to update this value when the isCollapsed prop changes
    useEffect(() => {
      updateHeaderHeight();
    }, [updateHeaderHeight, isCollapsed, isMobile]);

    useEffect(() => {
      window.addEventListener('resize', updateHeaderHeight);
      return () => {
        window.removeEventListener('resize', updateHeaderHeight);
      };
    }, [updateHeaderHeight]);

    const showFeatures = useCallback(() => {
      setIsCollapsed(false);
    }, []);

    useEffect(() => {
      if (!isCollapsed) {
        // set focus to the first row of the added rows when the table is expanded
        tableRef.current
          ?.querySelectorAll('tr')[9]
          ?.focus({ preventScroll: true });
      }
    }, [isCollapsed]);

    const SectionTitleElement = isMobile ? Compact : Body;

    return (
      <div className={classes.wrapper}>
        <table
          style={{ position: 'relative' }}
          className={classes.base}
          ref={applyMultipleRefs(ref, tableRef)}
          {...props}
        >
          <caption id="caption" className={utilClasses.hideVisually}>
            {caption}
          </caption>
          <thead ref={theadRef}>
            <tr className={classes.offers}>
              <th id="features" aria-hidden={true} />
              {(isMobile ? generateFromIndex(plans, activePlans) : plans).map(
                (plan) => (
                  <TableHeader key={plan.id} {...plan} />
                ),
              )}
            </tr>
          </thead>

          {rowsToDisplay.map((row) => (
            <tbody style={{ position: 'relative' }} key={row.title}>
              <tr tabIndex={-1}>
                <th
                  className={classes.section}
                  scope="rowgroup"
                  headers="features"
                  colSpan={plans.length + 1}
                  style={{
                    top: `${headerHeight}px`,
                  }}
                >
                  <SectionTitleElement size="m" weight="semibold">
                    {row.title}
                  </SectionTitleElement>
                </th>
              </tr>
              {row.features.map((feature) => (
                <FeatureRow
                  key={feature.featureDescription.label}
                  tabIndex={-1}
                  {...feature}
                  values={
                    isMobile
                      ? generateFromIndex(feature.values, activePlans)
                      : feature.values
                  }
                />
              ))}
            </tbody>
          ))}
        </table>
        {isCollapsed && (
          <div className={classes.expand}>
            <Button onClick={showFeatures} icon={Plus} variant="tertiary">
              {showAllFeaturesLabel}
            </Button>
          </div>
        )}
      </div>
    );
  },
);
