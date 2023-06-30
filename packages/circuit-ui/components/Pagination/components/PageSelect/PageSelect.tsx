/**
 * Copyright 2020, SumUp Ltd.
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

import { useCallback, FunctionComponent, ChangeEvent, Fragment } from 'react';

import Select, { SelectProps } from '../../../Select/index.js';

import classes from './PageSelect.module.css';

export interface PageSelectProps extends Omit<SelectProps, 'onChange'> {
  onChange: (page: number) => void;
  pages: number[];
  currentPage: number;
  totalPages: number;
  totalLabel?: (totalPages: number) => string;
  [key: string]: unknown;
}

export const PageSelect: FunctionComponent<PageSelectProps> = ({
  label,
  onChange,
  pages,
  currentPage,
  totalPages,
  totalLabel,
  ...props
}) => {
  const pageOptions = pages.map((value) => ({ value, label: `${value}` }));
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(parseInt(event.target.value, 10));
    },
    [onChange],
  );

  return (
    <Fragment>
      <Select
        {...props}
        label={label}
        value={currentPage}
        options={pageOptions}
        onChange={handleChange}
        hideLabel
      />
      {totalLabel && (
        <span className={classes.total}>{totalLabel(totalPages)}</span>
      )}
    </Fragment>
  );
};
