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

'use client';

import type { FC, OlHTMLAttributes } from 'react';

import Button from '../../../Button/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './PageList.module.css';

export interface PageListProps
  extends Omit<OlHTMLAttributes<HTMLOListElement>, 'onChange'> {
  onChange: (page: number) => void;
  pageLabel: (page: number) => string;
  pages: number[];
  currentPage: number;
}

export const PageList: FC<PageListProps> = ({
  onChange,
  pageLabel,
  pages,
  currentPage,
  className,
  ...props
}: PageListProps) => (
  // eslint-disable-next-line jsx-a11y/no-redundant-roles
  <ol role="list" className={clsx(classes.base, className)} {...props}>
    {pages.map((page) => {
      const isCurrent = currentPage === page;
      const label = pageLabel(page);
      return (
        <li key={page}>
          <Button
            size="s"
            onClick={() => onChange(page)}
            variant={isCurrent ? 'primary' : 'tertiary'}
            title={label}
            aria-label={label}
            aria-current={isCurrent}
            className={classes.button}
          >
            {page}
          </Button>
        </li>
      );
    })}
  </ol>
);
