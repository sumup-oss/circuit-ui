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

import { useState, HTMLProps } from 'react';
import { css } from '@emotion/core';
import { ChevronDown, Profile as ProfileIcon } from '@sumup/icons';
import { TrackingElement } from '@sumup/collector';

import styled, { StyleProps } from '../../../../styles/styled';
import { hideVisually, navigationItem } from '../../../../styles/style-mixins';
import Avatar, { AvatarProps } from '../../../Avatar';
import Body from '../../../Body';
import Popover, { PopoverProps } from '../../../Popover';
import { Skeleton } from '../../../Skeleton';
import { TRACKING_ELEMENTS } from '../../constants';

const profileWrapperStyles = ({ theme }: StyleProps) => css`
  height: 100%;
  padding: 0 ${theme.spacings.mega};
  border-left: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
`;

const ProfileWrapper = styled.button(navigationItem, profileWrapperStyles);

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

interface ProfileProps extends HTMLProps<HTMLButtonElement> {
  /**
   * A description of the button which opens the profile menu.
   */
  profileLabel: string;
  /**
   * A user's profile photo.
   */
  userAvatar?: AvatarProps;
  /**
   * A user's name. Strings longer than 20 characters are truncated.
   */
  userName: string;
  /**
   * An optional user id such as the SumUp merchant code.
   */
  userId?: string;
  /**
   * Whether the associated popover is open.
   */
  isOpen?: boolean;
  /**
   * Whether the profile page is the currently active page.
   */
  profileIsActive?: boolean;
}

function Profile({
  userAvatar,
  userName,
  userId,
  profileLabel,
  profileIsActive,
  isOpen,
  ...props
}: ProfileProps) {
  return (
    <ProfileWrapper
      {...props}
      type="button"
      aria-label={profileLabel}
      title={profileLabel}
      isActive={isOpen || profileIsActive}
    >
      <Skeleton circle>
        {userAvatar ? (
          <UserAvatar {...userAvatar} variant="identity" />
        ) : (
          <ProfileIcon role="presentation" />
        )}
      </Skeleton>
      <UserDetails>
        <Skeleton css={truncateStyles}>
          <Body size="two" variant="highlight" noMargin>
            {userName}
          </Body>
        </Skeleton>
        {userId && (
          <Skeleton css={truncateStyles}>
            <Body size="two" noMargin>
              {userId}
            </Body>
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
  profileActions: PopoverProps['actions'];
  /**
   * An optional label that is added to the element tree when clicking
   * a profile action.
   */
  profileTrackingLabel?: string;
}

export function ProfileMenu({
  userAvatar,
  userName,
  userId,
  profileLabel,
  profileActions,
  profileIsActive,
  profileTrackingLabel,
}: ProfileMenuProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const offsetModifier = { name: 'offset', options: { offset: [-16, 8] } };

  return (
    <TrackingElement
      name={TRACKING_ELEMENTS.PROFILE_SECTION}
      label={profileTrackingLabel}
    >
      <Popover
        isOpen={isOpen}
        onToggle={setOpen}
        component={(popoverProps) => (
          <Profile
            {...popoverProps}
            isOpen={isOpen}
            profileLabel={profileLabel}
            userAvatar={userAvatar}
            userName={userName}
            userId={userId}
            profileIsActive={profileIsActive}
          />
        )}
        actions={profileActions}
        placement="bottom-end"
        modifiers={[offsetModifier]}
      />
    </TrackingElement>
  );
}
