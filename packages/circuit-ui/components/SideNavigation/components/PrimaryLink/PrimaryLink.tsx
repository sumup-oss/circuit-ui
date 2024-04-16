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

import { ArrowRight } from '@sumup/icons';
import type { ComponentType } from 'react';

import type { AsPropType } from '../../../../types/prop-types.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import Body from '../../../Body/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import type { PrimaryLinkProps as PrimaryLinkType } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import utilityClasses from '../../../../styles/utility.js';

import classes from './PrimaryLink.module.css';

export interface PrimaryLinkProps extends PrimaryLinkType {
  isOpen?: boolean;
  suffix?: ComponentType<{ className?: string; role?: string }>;
}

export function PrimaryLink({
  icon,
  activeIcon,
  label,
  isActive,
  isExternal,
  suffix: Suffix,
  badge,
  secondaryGroups,
  className,
  ...props
}: PrimaryLinkProps): JSX.Element {
  const { Link } = useComponents();

  const Element = props.href ? (Link as AsPropType) : 'button';

  const suffix = Suffix && (
    <Suffix className={classes.suffix} aria-hidden="true" />
  );
  const isExternalLink = isExternal || props.target === '_blank';

  const Icon = isActive && activeIcon ? activeIcon : icon;

  return (
    <Element
      {...props}
      className={clsx(
        classes.base,
        utilityClasses.focusVisibleInset,
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Skeleton className={clsx(classes.icon, badge && classes['icon-badge'])}>
        <Icon aria-hidden="true" size="24" />
      </Skeleton>
      <Skeleton>
        <Body as="span" className={classes.label}>
          {label}
        </Body>
      </Skeleton>
      {/* FIXME: Make this accessible to screen readers */}
      {isExternalLink && (
        <ArrowRight
          size="16"
          aria-hidden="true"
          className={clsx(classes.suffix, classes['external-icon'])}
        />
      )}
      {suffix}
    </Element>
  );
}
