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
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { focusVisible } from '../../styles/style-mixins';
import Hamburger, { HamburgerProps } from '../Hamburger';
import { SkeletonContainer } from '../Skeleton';

import { ProfileMenu, ProfileMenuProps } from './components/ProfileMenu';
import { UtilityLinks, UtilityLinksProps } from './components/UtilityLinks';
import { UserProps } from './types';

const CONTENT_HEIGHT = '56px';
export const TOP_NAVIGATION_HEIGHT =
  '57px'; /* content height + border-bottom */

const headerStyles = ({ theme }: StyleProps) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${TOP_NAVIGATION_HEIGHT};
  background-color: var(--cui-bg-normal);
  border-bottom: ${theme.borderWidth.kilo} solid var(--cui-border-divider);

  ${theme.mq.tera} {
    position: sticky;
    top: 0;
    /* The +1 is necessary to ensure that the primary navigation doesn't */
    /* overlap the top navigation on hover. */
    z-index: ${theme.zIndex.navigation + 1};
  }
`;

const Header = styled.header(headerStyles);

const hamburgerStyles = (theme: Theme) => css`
  padding: ${theme.spacings.mega};
  ${focusVisible('inset')};

  border-radius: 0;
  /* The !important below is necessary to override the default hover styles. */
  border-right: ${theme.borderWidth.kilo} solid var(--cui-border-divider) !important;

  ${theme.mq.tera} {
    display: none;
  }
`;

const logoStyles = ({ theme }: StyleProps) => css`
  height: ${CONTENT_HEIGHT};

  > * {
    display: block;
    height: inherit;
    line-height: 0;
    padding: ${theme.spacings.mega};
  }

  a,
  button {
    ${focusVisible('inset')};
  }

  svg {
    color: var(--cui-fg-normal);
    height: ${theme.iconSizes.mega};
  }
`;

const Logo = styled.div(logoStyles);

const wrapperStyles = css`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

export interface TopNavigationProps extends Partial<UtilityLinksProps> {
  logo: ReactNode;
  hamburger?: HamburgerProps;
  user: UserProps;
  profileMenu: Omit<ProfileMenuProps, 'user'>;
  isLoading?: boolean;
}

export function TopNavigation({
  logo,
  user,
  profileMenu,
  links,
  hamburger,
  isLoading,
  ...props
}: TopNavigationProps): JSX.Element {
  return (
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
        <ProfileMenu {...profileMenu} user={user} />
      </SkeletonContainer>
    </Header>
  );
}
