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

import { ArrowRight } from '@sumup-oss/icons';
import { useId, type ComponentType } from 'react';

import type { AsPropType } from '../../../../types/prop-types.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { Body } from '../../../Body/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import type {
  PrimaryLinkProps as PrimaryLinkType,
  PrimaryBadgeProps,
} from '../../types.js';
import { isObject } from '../../../../util/type-check.js';
import { idx } from '../../../../util/idx.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';

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
  externalLabel,
  suffix: Suffix,
  badge,
  secondaryGroups,
  className,
  'aria-describedby': descriptionId,
  ...props
}: PrimaryLinkProps) {
  const { Link } = useComponents();
  const badgeLabelId = useId();
  const externalLabelId = useId();

  const badgeProps = getBadgeProps(badge);
  const descriptionIds = idx(
    badgeProps?.label && badgeLabelId,
    externalLabel && externalLabelId,
    descriptionId,
  );

  const Element = props.href ? (Link as AsPropType) : 'button';

  const suffix = Suffix && (
    <Suffix className={classes.suffix} aria-hidden="true" />
  );
  const isExternalLink = isExternal || props.target === '_blank';

  const Icon = isActive && activeIcon ? activeIcon : icon;

  return (
    <>
      <Element
        {...props}
        className={clsx(classes.base, utilClasses.focusVisibleInset, className)}
        aria-current={isActive ? 'page' : undefined}
        aria-describedby={descriptionIds}
      >
        <Skeleton
          className={clsx(
            classes.icon,
            badgeProps && classes.badge,
            badgeProps && classes[badgeProps.variant],
          )}
        >
          <Icon aria-hidden="true" size="24" />
        </Skeleton>
        <Skeleton>
          <Body as="span" className={classes.label}>
            {label}
          </Body>
        </Skeleton>
        {isExternalLink && (
          <ArrowRight
            size="16"
            aria-hidden="true"
            className={clsx(classes.suffix, classes['external-icon'])}
          />
        )}
        {suffix}
      </Element>
      {badgeProps?.label && (
        <span id={badgeLabelId} className={utilClasses.hideVisually}>
          {badgeProps.label}
        </span>
      )}
      {isExternalLink && externalLabel && (
        <span id={externalLabelId} className={utilClasses.hideVisually}>
          {externalLabel}
        </span>
      )}
    </>
  );
}

function getBadgeProps(badge?: boolean | PrimaryBadgeProps) {
  if (!badge) {
    return null;
  }
  const defaultProps = { variant: 'promo', label: '' } as const;
  return isObject(badge) ? { ...defaultProps, ...badge } : defaultProps;
}
