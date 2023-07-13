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

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { clsx } from '../../styles/clsx.js';

import classes from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The page title for the Header.
   */
  title: string;
  /**
   * If the Header should appear only on
   * mobile screens (useful for when using together with the Sidebar).
   */
  mobileOnly?: boolean;
  /**
   * The child component of Header.
   */
  children?: ReactNode;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ title, mobileOnly, children, ...props }, ref) => (
    <header
      className={clsx(
        classes.base,
        mobileOnly && classes['hide-on-wide-viewports'],
      )}
      ref={ref}
      {...props}
    >
      {children}
      <h1 className={classes.title}>{title}</h1>
    </header>
  ),
);

Header.displayName = 'Header';
