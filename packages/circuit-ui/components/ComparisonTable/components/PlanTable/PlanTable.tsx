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
  useMemo,
  useRef,
  useState,
} from 'react';
import { Plus } from '@sumup-oss/icons';

import { utilClasses } from '../../../../styles/utility.js';
import {
  TableHeader,
  type TableHeaderDetails,
} from '../TableHeader/TableHeader.js';
import { generateFromIndex, getFirstNRows } from '../../utils.js';
import { Button } from '../../../Button/index.js';
import { applyMultipleRefs } from '../../../../util/refs.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';
import { Body } from '../../../Body/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { RowHeader, type RowHeaderProps } from '../RowHeader/RowHeader.js';
import { type CellValue, TableCell } from '../TableCell/TableCell.js';
import type { ToggletipProps } from '../../../Toggletip/index.js';

import classes from './PlanTable.module.css';

const COLLAPSE_THRESHOLD = 8;

export interface Feature {
  featureDescription: {
    label: string;
    description?: string;
    toggletip?: ToggletipProps;
  };
  /**
   * An array of the cell values and labels in the same order of the given headers.
   */
  values: CellValue[];
  headers?: RowHeaderProps['headers'];
}

export interface FeatureSection {
  title: string;
  features: Feature[];
}

export interface PlanTableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * A descriptive caption for the table.
   */
  caption: string;
  /**
   * The label for the button that expands the table when collapsed.
   */
  showAllFeaturesLabel: string;
  /**
   * An array containing the information of the items to compare.
   */
  headers: TableHeaderDetails[];
  /**
   * A list of sections with features to display. Each section has a title and a list of features.
   * Each feature has its information and a list of values corresponding to the items to compare, in their same order of appearance in the `headers` prop.
   */
  sections: FeatureSection[];
  /**
   * An array of the two positions of the currently selected plans.
   * the first index is the first plan, the second index is the second plan.
   */
  activePlans: number[];
}

export const PlanTable = forwardRef<HTMLTableElement, PlanTableProps>(
  (
    { caption, showAllFeaturesLabel, headers, sections, activePlans, ...props },
    ref,
  ) => {
    const tableRef = useRef<HTMLTableElement>(null);
    const theadRef = useRef<HTMLTableSectionElement>(null);
    const isMobile = useMedia('(max-width: 767px)', true);
    const isTablet = useMedia(
      '(max-width: 767px) and (min-width: 480px)',
      true,
    );
    const [isCollapsed, setIsCollapsed] = useState(
      sections.reduce(
        // the table is collapsed if the total number of rows is greater than the threshold, section titles included.
        (totalRows, section) => totalRows + section.features.length + 1,
        0,
      ) > COLLAPSE_THRESHOLD,
    );
    const [sectionOffset, setSectionOffset] = useState(0);
    const isPlanPickerVisible = headers.length > 2;

    useEffect(() => {
      const tableHeaderElement = theadRef.current;
      const tableElement = tableRef.current;
      if (
        !tableHeaderElement ||
        typeof ResizeObserver === 'undefined' ||
        !tableElement
      ) {
        return undefined;
      }

      // opt for progressive enhancement
      // eslint-disable-next-line compat/compat
      const headerSizeObserver = new ResizeObserver((entries) => {
        /* account for sticky plan picker on mobile */
        const planPickerHeight = isPlanPickerVisible
          ? (isMobile ? 80 : 0) + (isTablet ? 16 : 0)
          : 0;
        /* account for sticky top navigation, if it exists */
        const topNavigationHeight = Number(
          getComputedStyle(tableElement)
            .getPropertyValue('--top-navigation-height')
            .replace('px', '') ?? 0,
        );
        setSectionOffset(
          entries[0].contentRect.height +
            planPickerHeight +
            topNavigationHeight,
        );
      });

      headerSizeObserver.observe(tableHeaderElement);
      return () => {
        headerSizeObserver.unobserve(tableHeaderElement);
      };
    }, [isPlanPickerVisible, isMobile, isTablet]);

    const showFeatures = useCallback(() => {
      setIsCollapsed(false);
    }, []);

    useEffect(() => {
      if (!isCollapsed) {
        // set focus to the first row of the added rows when the table is expanded
        tableRef.current
          ?.querySelectorAll('tr')
          ?.[COLLAPSE_THRESHOLD + 1]?.focus({ preventScroll: true });
      }
    }, [isCollapsed]);

    const sectionsToDisplay = useMemo(
      () =>
        isCollapsed ? getFirstNRows(sections, COLLAPSE_THRESHOLD) : sections,
      [sections, isCollapsed],
    );

    const headersToDisplay = useMemo(
      () => (isMobile ? generateFromIndex(headers, activePlans) : headers),
      [headers, activePlans, isMobile],
    );

    return (
      <div className={classes.base}>
        <table
          className={classes.table}
          ref={applyMultipleRefs(ref, tableRef)}
          {...props}
        >
          <caption id="caption" className={utilClasses.hideVisually}>
            {caption}
          </caption>
          <colgroup>
            <col />
            {(isMobile ? activePlans : headers).map((_, index) => (
              <col key={`cui-ct-col-${index}`} />
            ))}
          </colgroup>
          <thead ref={theadRef}>
            <tr>
              <td className={clsx(isPlanPickerVisible && classes.offset)} />
              {headersToDisplay.map((plan, index) => (
                <TableHeader
                  {...plan}
                  key={`cui-ct-headers-${plan.id}`}
                  id={`cui-ct-headers-${plan.id}`}
                  className={clsx(
                    index > 0 && classes.border,
                    isPlanPickerVisible && classes.offset,
                  )}
                />
              ))}
            </tr>
          </thead>

          {sectionsToDisplay.map((row, sectionIndex) => (
            <tbody
              style={{ position: 'relative' }}
              key={`cui-ct-tbody-${sectionIndex}`}
            >
              <tr tabIndex={-1}>
                <th
                  className={classes.section}
                  scope="rowgroup"
                  id={`cui-ct-sections-${sectionIndex}`}
                  colSpan={headers.length + 1}
                  style={{
                    top: `${sectionOffset}px`,
                  }}
                >
                  <Body className={classes.title} size="m" weight="semibold">
                    {row.title}
                  </Body>
                </th>
              </tr>
              {row.features.map((feature) => {
                const featureId = feature.featureDescription.label.replace(
                  /\s+/g,
                  '',
                );
                return (
                  <tr tabIndex={-1} key={featureId}>
                    <RowHeader
                      description={feature.featureDescription.description}
                      toggletip={feature.featureDescription.toggletip}
                      headers={`cui-ct-sections-${sectionIndex}`}
                      id={featureId}
                      offset={sectionOffset}
                    >
                      {feature.featureDescription.label}
                    </RowHeader>
                    {(isMobile
                      ? generateFromIndex(feature.values, activePlans)
                      : feature.values
                    ).map((value, index) => (
                      <TableCell
                        key={`cui-comparison-table-${feature.featureDescription.label}-cell-${index}`}
                        headers={`cui-ct-sections-${sectionIndex} ${featureId} cui-ct-headers-${headersToDisplay[index]?.id}`}
                        cellValue={value}
                      />
                    ))}
                  </tr>
                );
              })}
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
