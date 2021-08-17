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
import { TrackingElement } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import { focusVisible } from '../../styles/style-mixins';
import Hamburger, { HamburgerProps } from '../Hamburger';
import { SkeletonContainer } from '../Skeleton';

import { ProfileMenu, ProfileMenuProps } from './components/ProfileMenu';
import { UtilityLinks, UtilityLinksProps } from './components/UtilityLinks';
import { TRACKING_ELEMENTS } from './constants';

export const TOP_NAVIGATION_HEIGHT = '49px'; /* height + border-bottom */

const headerStyles = ({ theme }: StyleProps) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${TOP_NAVIGATION_HEIGHT};
  background-color: ${theme.colors.bodyBg};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  ${theme.mq.giga} {
    position: sticky;
    top: 0;
    /* The +1 is necessary to ensure that the primary navigation doesn't */
    /* overlap the top navigation on hover. */
    z-index: ${theme.zIndex.navigation + 1};
  }
`;

const Header = styled.header(headerStyles);

const hamburgerStyles = (theme: Theme) => css`
  ${focusVisible('inset')(theme)};

  border-radius: 0;
  /* The !important below is necessary to override the default hover styles. */
  border-right: ${theme.borderWidth.kilo} solid ${theme.colors.n300} !important;

  ${theme.mq.giga} {
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

const wrapperStyles = css`
  display: flex;
  align-items: stretch;
`;

export interface TopNavigationProps
  extends ProfileMenuProps,
    Partial<UtilityLinksProps> {
  logo: ReactNode;
  hamburger?: HamburgerProps;
  isLoading?: boolean;
}

export function TopNavigation({
  logo,
  userAvatar,
  userName,
  userId,
  profileLabel,
  profileActions,
  profileIsActive,
  profileTrackingLabel,
  links,
  hamburger,
  isLoading,
  ...props
}: TopNavigationProps): JSX.Element {
  return (
    <TrackingElement name={TRACKING_ELEMENTS.TOP_NAVIGATION}>
      <Header role="banner" {...props}>
        <div css={wrapperStyles}>
          {hamburger && (
            <SkeletonContainer isLoading={Boolean(isLoading)}>
              <Hamburger {...hamburger} css={hamburgerStyles} />
            </SkeletonContainer>
          )}
          <Logo>{logo}</Logo>
        </div>
        <SkeletonContainer css={wrapperStyles} isLoading={Boolean(isLoading)}>
          {links && <UtilityLinks links={links} />}
          <ProfileMenu
            userAvatar={userAvatar}
            userName={userName}
            userId={userId}
            profileLabel={profileLabel}
            profileActions={profileActions}
            profileIsActive={profileIsActive}
            profileTrackingLabel={profileTrackingLabel}
          />
        </SkeletonContainer>
      </Header>
    </TrackingElement>
  );
}
