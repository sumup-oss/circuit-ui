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

import { forwardRef } from 'react';

import type { AsPropType } from '../../../../types/prop-types.js';
import {
  useFocusList,
  type FocusProps,
} from '../../../../hooks/useFocusList/index.js';
import { Body } from '../../../Body/index.js';
import { Badge } from '../../../Badge/index.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import type { SecondaryGroupProps, SecondaryLinkProps } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { sharedClasses } from '../../../../styles/shared.js';
import { TierIndicator } from '../../../TierIndicator/TierIndicator.js';
import { CircuitError } from '../../../../util/errors.js';

import classes from './SecondaryLinks.module.css';

function SecondaryLink({
  label,
  badge,
  tier,
  isActive,
  ...props
}: SecondaryLinkProps) {
  if (process.env.NODE_ENV !== 'production' && tier && badge) {
    throw new CircuitError(
      'SideNavigation',
      'The `badge` and `tier` props cannot be used simultaneously.',
    );
  }

  const { Link } = useComponents();

  const Element = props.href ? (Link as AsPropType) : 'button';

  return (
    <li>
      <Element
        {...props}
        className={clsx(
          classes.anchor,
          sharedClasses.navigationItem,
          utilClasses.focusVisibleInset,
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <Skeleton className={classes.label}>
          <Body as="span" size="m" weight={isActive ? 'bold' : undefined}>
            {label}
          </Body>
        </Skeleton>
        {badge && <Badge variant="promo" as="span" {...badge} />}
        {tier && <TierIndicator {...tier} size="s" />}
      </Element>
    </li>
  );
}

function SecondaryGroup({
  label,
  secondaryLinks,
  focusProps,
}: SecondaryGroupProps & { focusProps: FocusProps }) {
  return (
    <li>
      {label && (
        <Skeleton className={classes['group-headline']} as="div">
          <Body
            color="subtle"
            className={classes.headline}
            weight="semibold"
            as="h3"
            size="s"
          >
            {label}
          </Body>
        </Skeleton>
      )}
      <ul role="list" className={classes.list}>
        {secondaryLinks.map((link) => (
          <SecondaryLink key={link.label} {...link} {...focusProps} />
        ))}
      </ul>
    </li>
  );
}

export interface SecondaryLinksProps {
  secondaryGroups: SecondaryGroupProps[];
  className?: string;
}

export const SecondaryLinks = forwardRef<HTMLUListElement, SecondaryLinksProps>(
  ({ secondaryGroups, className, ...props }, ref) => {
    const focusProps = useFocusList();
    return (
      <ul
        role="list"
        ref={ref}
        className={clsx(classes.list, className)}
        {...props}
      >
        {secondaryGroups.map((group) => (
          <SecondaryGroup
            key={group.label}
            {...group}
            focusProps={focusProps}
          />
        ))}
      </ul>
    );
  },
);

SecondaryLinks.displayName = 'SecondaryLinks';
