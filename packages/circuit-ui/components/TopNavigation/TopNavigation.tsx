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
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { focusVisible } from '../../styles/style-mixins';
import Hamburger, { HamburgerProps } from '../Hamburger';

import { ProfileMenu, ProfileMenuProps } from './components/ProfileMenu';
import { UtilityLinks, UtilityLinksProps } from './components/UtilityLinks';

const headerStyles = ({ theme }: StyleProps) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 49px; /* height + border-bottom */
  background-color: ${theme.colors.bodyBg};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n200};
`;

const Header = styled.header(headerStyles);

const hamburgerStyles = (theme: Theme) => css`
  ${focusVisible('inset')(theme)};

  border-radius: 0;
  /* Need to use !important here to override the default hover styles */
  border-right: ${theme.borderWidth.kilo} solid ${theme.colors.n200} !important;

  ${theme.mq.mega} {
    display: none;
  }
`;

const logoStyles = ({ theme }: StyleProps) => css`
  height: ${theme.iconSizes.tera};

  > * {
    display: block;
    height: inherit;
    line-height: 0;
    padding: ${theme.spacings.kilo};
  }

  a,
  button {
    ${focusVisible('inset')(theme)};
  }

  svg {
    color: ${theme.colors.black};
    height: 100%;
  }
`;

const Logo = styled.div(logoStyles);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

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
  profileIsActive,
  links,
  hamburger,
  ...props
}: TopNavigationProps): JSX.Element {
  return (
    <Header role="banner" {...props}>
      <Wrapper>
        {hamburger && <Hamburger {...hamburger} css={hamburgerStyles} />}
        <Logo>{logo}</Logo>
      </Wrapper>
      <Wrapper>
        {links && <UtilityLinks links={links} />}
        <ProfileMenu
          userAvatar={userAvatar}
          userName={userName}
          userId={userId}
          profileLabel={profileLabel}
          profileActions={profileActions}
          profileIsActive={profileIsActive}
        />
      </Wrapper>
    </Header>
  );
}
