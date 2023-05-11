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
import { css } from '@emotion/react';
import { ChevronDown, Profile as ProfileIcon } from '@sumup/icons';
import { TrackingElement } from '@sumup/collector';

import styled, { NoTheme, StyleProps } from '../../../../styles/styled';
import { hideVisually, navigationItem } from '../../../../styles/style-mixins';
import Avatar from '../../../Avatar';
import Body from '../../../Body';
import Popover, { PopoverProps } from '../../../Popover';
import { Skeleton } from '../../../Skeleton';
import { TRACKING_ELEMENTS } from '../../constants';
import { UserProps } from '../../types';
import { TrackingProps } from '../../../../hooks/useClickEvent';

const profileWrapperStyles = ({ theme }: StyleProps) => css`
  height: 100%;
  padding: 0 ${theme.spacings.mega};
  border-left: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
`;

const ProfileWrapper = styled.button<NoTheme>(
  navigationItem,
  profileWrapperStyles,
);

const userAvatarStyles = ({ theme }: StyleProps) => css`
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};

  ${theme.mq.mega} {
    width: ${theme.iconSizes.giga};
    height: ${theme.iconSizes.giga};
  }
`;

const UserAvatar = styled(Avatar)(userAvatarStyles);

const userDetailsStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilMega} {
    ${hideVisually()};
  }

  ${theme.mq.mega} {
    margin: 0 ${theme.spacings.kilo};
    max-width: 20ch;
  }
`;

const UserDetails = styled.div(userDetailsStyles);

const truncateStyles = css`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const chevronStyles = ({ theme }: StyleProps) => css`
  display: none;

  ${theme.mq.mega} {
    display: block;
    transition: transform ${theme.transitions.default};

    button[aria-expanded='true'] & {
      transform: rotate(180deg);
    }
  }
`;

const Chevron = styled(ChevronDown)(chevronStyles);

interface ProfileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * A description of the button which opens the profile menu.
   */
  label: string;
  /**
   * The user's profile.
   */
  user: UserProps;
  /**
   * Whether the associated popover is open.
   */
  isOpen?: boolean;
  /**
   * Whether the profile page is the currently active page.
   */
  isActive?: boolean;
}

function Profile({ user, label, isActive, isOpen, ...props }: ProfileProps) {
  return (
    <ProfileWrapper
      {...props}
      type="button"
      aria-label={label}
      title={label}
      isActive={isOpen || isActive}
    >
      <Skeleton circle>
        {user.avatar ? (
          <UserAvatar {...user.avatar} variant="identity" />
        ) : (
          <ProfileIcon role="presentation" />
        )}
      </Skeleton>
      <UserDetails>
        <Skeleton css={truncateStyles}>
          <Body size="two" variant="highlight">
            {user.name}
          </Body>
        </Skeleton>
        {user.id && (
          <Skeleton css={truncateStyles}>
            <Body size="two">{user.id}</Body>
          </Skeleton>
        )}
      </UserDetails>
      <Chevron size="16" />
    </ProfileWrapper>
  );
}

export interface ProfileMenuProps extends ProfileProps {
  /**
   * A collection of actions to be rendered in the profile menu.
   * Same API as the Popover actions.
   */
  actions: PopoverProps['actions'];
  /**
   * @deprecated
   *
   * An optional label that is added to the element tree when clicking
   * a profile action.
   */
  trackingLabel?: string;
  /**
   * @deprecated
   *
   * Use an `onToggle` handler to dispatch user interaction events instead.
   */
  tracking?: TrackingProps;
  /**
   * Function that is called when opening and closing the ProfileMenu.
   */
  onToggle?: (isOpen: boolean) => void;
}

export function ProfileMenu({
  user,
  label,
  actions,
  isActive,
  onToggle,
  trackingLabel,
  tracking,
}: ProfileMenuProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const offset = { mainAxis: 8, crossAxis: -16 };

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [onToggle, isOpen]);

  return (
    <TrackingElement
      name={TRACKING_ELEMENTS.PROFILE_SECTION}
      label={trackingLabel}
    >
      <Popover
        isOpen={isOpen}
        onToggle={setOpen}
        component={(popoverProps) => (
          <Profile
            {...popoverProps}
            isOpen={isOpen}
            label={label}
            user={user}
            isActive={isActive}
          />
        )}
        actions={actions}
        placement="bottom-end"
        offset={offset}
        tracking={
          tracking ? { ...tracking, component: 'profile_menu' } : undefined
        }
      />
    </TrackingElement>
  );
}
