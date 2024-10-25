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

/* eslint-disable jsx-a11y/no-redundant-roles */

'use client';

import { utilClasses } from '../../../../styles/utility';
import { clsx } from '../../../../styles/clsx';
import { useFocusList } from '../../../../hooks/useFocusList/index';
import { Headline } from '../../../Headline/index';
import { Skeleton, SkeletonContainer } from '../../../Skeleton/index';
import type { PrimaryLinkProps } from '../../types';
import { SecondaryLinks } from '../SecondaryLinks/index';
import { PrimaryLink } from '../PrimaryLink/index';

import classes from './DesktopNavigation.module.css';

export interface DesktopNavigationProps {
  /**
   * Whether the navigation data is loading.
   */
  isLoading?: boolean;
  /**
   * A collection of links with nested secondary groups.
   */
  primaryLinks: PrimaryLinkProps[];
  /**
   * Text label for the primary navigation for screen readers.
   * Important for accessibility.
   */
  primaryNavigationLabel: string;
  /**
   * Text label for the secondary navigation for screen readers.
   * Important for accessibility.
   */
  secondaryNavigationLabel: string;
}

export function DesktopNavigation({
  isLoading,
  primaryLinks,
  primaryNavigationLabel,
  secondaryNavigationLabel,
}: DesktopNavigationProps) {
  const focusProps = useFocusList();

  const activePrimaryLink = primaryLinks.find((link) => link.isActive);
  const secondaryGroups = activePrimaryLink?.secondaryGroups;

  return (
    <SkeletonContainer
      isLoading={Boolean(isLoading)}
      className={classes.wrapper}
    >
      <nav
        className={clsx(classes.primary, utilClasses.hideScrollbar)}
        aria-label={primaryNavigationLabel}
      >
        <ul role="list" className={classes.list}>
          {primaryLinks.map((link) => (
            <li key={link.label}>
              <PrimaryLink {...link} {...focusProps} />
            </li>
          ))}
        </ul>
      </nav>
      {secondaryGroups && secondaryGroups.length > 0 && (
        <nav
          className={classes.secondary}
          aria-label={secondaryNavigationLabel}
        >
          <Skeleton className={classes.headline} as="div">
            <Headline as="h2" size="m">
              {activePrimaryLink?.label}
            </Headline>
          </Skeleton>
          <SecondaryLinks secondaryGroups={secondaryGroups} />
        </nav>
      )}
    </SkeletonContainer>
  );
}
