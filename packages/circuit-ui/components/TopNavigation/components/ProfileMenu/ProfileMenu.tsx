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
import { ChevronDown } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled';
import { hideVisually, navigationItem } from '../../../../styles/style-mixins';
import Avatar, { AvatarProps } from '../../../Avatar';
import Body from '../../../Body';
import Popover, { PopoverProps } from '../../../Popover';

const profileWrapperStyles = ({ theme }: StyleProps) => css`
  padding: ${theme.spacings.byte};

  ${theme.mq.mega} {
    padding: ${theme.spacings.bit} ${theme.spacings.mega};
  }
`;

const ProfileWrapper = styled.button(navigationItem, profileWrapperStyles);

const profileAvatarStyles = ({ theme }: StyleProps) => css`
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};

  ${theme.mq.mega} {
    width: ${theme.iconSizes.giga};
    height: ${theme.iconSizes.giga};
  }
`;

const ProfileAvatar = styled(Avatar)(profileAvatarStyles);

const profileNameStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilMega} {
    ${hideVisually()};
  }

  ${theme.mq.mega} {
    margin: 0 ${theme.spacings.kilo};
    max-width: 20ch;
    text-overflow: ellipsis;
  }
`;

const ProfileName = styled.div(profileNameStyles);

const userNameStyles = css`
  display: block;
  max-width: 132px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserName = styled(Body)(userNameStyles);

const chevronStyles = ({ theme }: StyleProps) => css`
  display: none;

  ${theme.mq.mega} {
    display: block;

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
}

function Profile({
  userAvatar = { alt: '' },
  userName,
  userId,
  profileLabel,
  isOpen,
  ...props
}: ProfileProps) {
  return (
    <ProfileWrapper
      {...props}
      type="button"
      aria-label={profileLabel}
      title={profileLabel}
      isActive={isOpen}
    >
      <ProfileAvatar {...userAvatar} variant="identity" />
      <ProfileName>
        <UserName size="two" variant="highlight" noMargin>
          {userName}
        </UserName>
        <Body size="two" noMargin>
          {userId}
        </Body>
      </ProfileName>
      <Chevron />
    </ProfileWrapper>
  );
}

export interface ProfileMenuProps extends ProfileProps {
  /**
   * A collection of actions to be rendered in the profile menu.
   * Same API as the Popover actions.
   */
  profileActions: PopoverProps['actions'];
}

export function ProfileMenu({
  userAvatar,
  userName,
  userId,
  profileLabel,
  profileActions,
}: ProfileMenuProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const offsetModifier = { name: 'offset', options: { offset: [0, 16] } };

  return (
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
        />
      )}
      actions={profileActions}
      placement="bottom-end"
      modifiers={[offsetModifier]}
    />
  );
}
