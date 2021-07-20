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

import { ReactNode } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { focusVisible } from '../../styles/style-mixins';

import { ProfileMenu, ProfileMenuProps } from './components/ProfileMenu';
import { UtilityLinks, UtilityLinksProps } from './components/UtilityLinks';
import { Hamburger, HamburgerProps } from './components/Hamburger';

const headerStyles = ({ theme }: StyleProps) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${theme.colors.bodyBg};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  ${theme.mq.mega} {
    height: 64px;
  }
`;

const Header = styled.header(headerStyles);

const logoStyles = ({ theme }: StyleProps) => css`
  height: ${theme.iconSizes.mega};
  margin-left: ${theme.spacings.kilo};

  a,
  button {
    display: block;
    height: inherit;
    line-height: 0;
    border-radius: ${theme.borderRadius.bit};

    ${focusVisible(theme)};
  }

  svg {
    color: ${theme.colors.black};
    height: 100%;
  }

  ${theme.mq.mega} {
    height: ${theme.iconSizes.giga};
    margin-left: 20px;
  }
`;

const Logo = styled.div(logoStyles);

const startAreaStyles = css`
  display: flex;
  align-items: center;
`;

const StartArea = styled.div(startAreaStyles);

const endAreaStyles = ({ theme }: StyleProps) => css`
  display: flex;
  margin-right: ${theme.spacings.bit};

  ${theme.mq.mega} {
    margin-right: ${theme.spacings.mega};
  }
`;

const EndArea = styled.div(endAreaStyles);

export interface TopNavigationProps
  extends ProfileMenuProps,
    Partial<UtilityLinksProps> {
  logo: ReactNode;
  hamburger?: HamburgerProps;
}

export function TopNavigation({
  logo,
  userAvatar,
  userName,
  userId,
  profileLabel,
  profileActions,
  links,
  hamburger,
  ...props
}: TopNavigationProps): JSX.Element {
  return (
    <Header role="banner" {...props}>
      <StartArea>
        {hamburger && <Hamburger {...hamburger} />}
        <Logo>{logo}</Logo>
      </StartArea>
      <EndArea>
        {links && <UtilityLinks links={links} />}
        <ProfileMenu
          userAvatar={userAvatar}
          userName={userName}
          userId={userId}
          profileLabel={profileLabel}
          profileActions={profileActions}
        />
      </EndArea>
    </Header>
  );
}
