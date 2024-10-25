/**
 * Copyright 2019, SumUp Ltd.
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

import { Children, type HTMLAttributes } from 'react';

import { clsx } from '../../../../styles/clsx';
import { utilClasses } from '../../../../styles/utility';

import classes from './TabList.module.css';

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  stretched?: boolean;
}

const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;

/**
 * TabList component that wraps the Tab components
 */
export function TabList({
  className,
  style = {},
  stretched,
  children,
  ...props
}: TabListProps) {
  const numberOfTabs = Children.toArray(children).length;
  const tabWidth = Math.floor(100 / numberOfTabs);
  const stretchOnMobile = numberOfTabs <= MOBILE_AUTOSTRETCH_ITEMS_MAX;
  return (
    <div
      className={clsx(classes.wrapper, utilClasses.hideScrollbar, className)}
      style={{ ...style, '--tab-list-width': tabWidth }}
    >
      <div
        className={clsx(
          classes.base,
          stretched && classes.stretched,
          stretchOnMobile && classes['stretched-mobile'],
        )}
        {...props}
        role="tablist"
      >
        {children}
      </div>
    </div>
  );
}
