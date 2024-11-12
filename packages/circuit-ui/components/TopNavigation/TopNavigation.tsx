/**
 * Copyright 2021, SumUp Ltd.
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

import type { HTMLAttributes, ReactNode } from 'react';

import { Hamburger, type HamburgerProps } from '../Hamburger/index.js';
import { SkeletonContainer } from '../Skeleton/index.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import {
  ProfileMenu,
  type ProfileMenuProps,
} from './components/ProfileMenu/index.js';
import {
  UtilityLinks,
  type UtilityLinksProps,
} from './components/UtilityLinks/index.js';
import type { UserProps } from './types.js';
import classes from './TopNavigation.module.css';

/**
 * @deprecated Use the `var(--top-navigation-height)` CSS variable instead.
 */
export const TOP_NAVIGATION_HEIGHT = '57px';

export interface TopNavigationProps
  extends Partial<UtilityLinksProps>,
    HTMLAttributes<HTMLElement> {
  logo: ReactNode;
  hamburger?: HamburgerProps;
  /**
   * @deprecated Use a custom component in the `links` prop instead.
   */
  profileMenu?: Omit<ProfileMenuProps, 'user'>;
  /**
   * @deprecated Use a custom component in the `links` prop instead.
   */
  user?: UserProps;
  isLoading?: boolean;
}

export function TopNavigation({
  logo,
  user,
  profileMenu,
  links,
  hamburger,
  isLoading,
  className,
  ...props
}: TopNavigationProps) {
  return (
    <header className={clsx(classes.base, className)} {...props}>
      <div className={classes.wrapper}>
        {hamburger && (
          <SkeletonContainer isLoading={Boolean(isLoading)}>
            <Hamburger
              {...hamburger}
              className={clsx(classes.hamburger, utilClasses.focusVisibleInset)}
            />
          </SkeletonContainer>
        )}
        <div className={classes.logo}>{logo}</div>
      </div>
      <SkeletonContainer
        className={classes.wrapper}
        isLoading={Boolean(isLoading)}
      >
        {links && <UtilityLinks links={links} />}
        {profileMenu && user && <ProfileMenu {...profileMenu} user={user} />}
      </SkeletonContainer>
    </header>
  );
}
