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

import { useState, ButtonHTMLAttributes, useEffect } from 'react';
import { ChevronDown, Profile as ProfileIcon } from '@sumup/icons';

import Avatar from '../../../Avatar/index.js';
import Body from '../../../Body/index.js';
import Popover, { PopoverProps } from '../../../Popover/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import type { UserProps } from '../../types.js';
import sharedClasses from '../../../../styles/shared.js';
import { clsx } from '../../../../styles/clsx.js';

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
  return (
    <button
      {...props}
      className={clsx(classes.profile, sharedClasses.navigationItem, className)}
      type="button"
      aria-label={label}
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
      <div className={classes.details}>
        <Skeleton className={classes.truncate}>
          <Body size="two" variant="highlight">
            {user.name}
          </Body>
        </Skeleton>
        {user.id && (
          <Skeleton className={classes.truncate}>
            <Body size="two">{user.id}</Body>
          </Skeleton>
        )}
      </div>
      <ChevronDown size="16" className={classes.chevron} />
    </button>
  );
}

export interface ProfileMenuProps extends ProfileProps {
  /**
   * A collection of actions to be rendered in the profile menu.
   * Same API as the Popover actions.
   */
  actions: PopoverProps['actions'];
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
}: ProfileMenuProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const offset = { mainAxis: 8, crossAxis: -16 };

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [onToggle, isOpen]);

  return (
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
    />
  );
}
