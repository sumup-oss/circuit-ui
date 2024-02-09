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

import { HTMLAttributes, ReactNode, useEffect } from 'react';

import Hamburger, { HamburgerProps } from '../Hamburger/index.js';
import { SkeletonContainer } from '../Skeleton/index.js';
import { clsx } from '../../styles/clsx.js';
import utilityClasses from '../../styles/utility.js';

import {
  ProfileMenu,
  ProfileMenuProps,
} from './components/ProfileMenu/index.js';
import {
  UtilityLinks,
  UtilityLinksProps,
} from './components/UtilityLinks/index.js';
import { UserProps } from './types.js';
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
  user: UserProps;
  profileMenu: Omit<ProfileMenuProps, 'user'>;
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
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--top-navigation-height',
      TOP_NAVIGATION_HEIGHT,
    );
    return () => {
      document.documentElement.style.removeProperty('--top-navigation-height');
    };
  }, []);

  return (
    <header className={clsx(classes.base, className)} {...props}>
      <div className={classes.wrapper}>
        {hamburger && (
          <SkeletonContainer isLoading={Boolean(isLoading)}>
            <Hamburger
              {...hamburger}
              className={clsx(
                classes.hamburger,
                utilityClasses.focusVisibleInset,
              )}
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
        <ProfileMenu {...profileMenu} user={user} />
      </SkeletonContainer>
    </header>
  );
}
