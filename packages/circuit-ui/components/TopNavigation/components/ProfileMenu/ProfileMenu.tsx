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

import { useState, useEffect, type ButtonHTMLAttributes } from 'react';
import { ChevronDown, Profile as ProfileIcon } from '@sumup-oss/icons';

import { Avatar } from '../../../Avatar/index.js';
import { Body } from '../../../Body/index.js';
import { Popover } from '../../../Popover/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import type { UserProps } from '../../types.js';
import { utilClasses } from '../../../../styles/utility.js';
import { sharedClasses } from '../../../../styles/shared.js';
import { clsx } from '../../../../styles/clsx.js';
import type { Action } from '../../../Popover/Popover.js';

import classes from './ProfileMenu.module.css';

interface ProfileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * A description of the button which opens the profile menu.
   */
  label: string;
  /**
   * The user's profile.
   */
  user: UserProps;
}

function Profile({ user, label, className, ...props }: ProfileProps) {
  const ariaLabel = [user.name, user.id]
    .filter((part) => Boolean(part))
    .join(', ');

  return (
    <button
      {...props}
      className={clsx(
        classes.profile,
        sharedClasses.navigationItem,
        utilClasses.focusVisibleInset,
        className,
      )}
      type="button"
      aria-label={ariaLabel}
      title={label}
    >
      <Skeleton circle>
        {user.avatar ? (
          <Avatar
            {...user.avatar}
            variant="identity"
            className={classes.avatar}
          />
        ) : (
          <ProfileIcon aria-hidden="true" />
        )}
      </Skeleton>
      <span className={classes.details}>
        <Skeleton className={classes.truncate}>
          <Body as="span" size="s" weight="bold">
            {user.name}
          </Body>
        </Skeleton>
        {user.id && (
          <Skeleton className={classes.truncate}>
            <Body as="span" size="s">
              {user.id}
            </Body>
          </Skeleton>
        )}
      </span>
      <ChevronDown size="16" className={classes.chevron} />
    </button>
  );
}

export interface ProfileMenuProps extends ProfileProps {
  /**
   * A collection of actions to be rendered in the profile menu.
   * Same API as the Popover actions.
   */
  actions: Action[];
  /**
   * Function that is called when opening and closing the ProfileMenu.
   */
  onToggle?: (isOpen: boolean) => void;
  /**
   * A class name for the Popover component.
   */
  className?: string;
}

export function ProfileMenu({
  user,
  label,
  actions,
  onToggle,
  className,
}: ProfileMenuProps) {
  const [isOpen, setOpen] = useState(false);
  const offset = { mainAxis: 8, crossAxis: -16 };

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [onToggle, isOpen]);

  return (
    // biome-ignore lint/a11y/useValidAriaRole: This removes the default `menu` role of the Popover.
    <Popover
      isOpen={isOpen}
      onToggle={setOpen}
      component={(popoverProps) => (
        <Profile {...popoverProps} label={label} user={user} />
      )}
      actions={actions}
      placement="bottom-end"
      fallbackPlacements={[]}
      offset={offset}
      className={className}
      // This removes the default `menu` role of the Popover.
      // eslint-disable-next-line jsx-a11y/aria-role
      role="none"
    />
  );
}
