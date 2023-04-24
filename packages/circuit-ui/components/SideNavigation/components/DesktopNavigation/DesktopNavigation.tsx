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

/* eslint-disable jsx-a11y/no-redundant-roles */

import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../../../styles/styled.js';
import { shadow, hideScrollbar } from '../../../../styles/style-mixins';
import { useFocusList } from '../../../../hooks/useFocusList';
import { TOP_NAVIGATION_HEIGHT } from '../../../TopNavigation/TopNavigation';
import Headline from '../../../Headline';
import { Skeleton, SkeletonContainer } from '../../../Skeleton';
import { PrimaryLinkProps } from '../../types.js';
import { SecondaryLinks } from '../SecondaryLinks';
import { PrimaryLink } from '../PrimaryLink';

export interface DesktopNavigationProps {
  /**
   * Whether the navigation data is loading.
   */
  isLoading?: boolean;
  /**
   * A collection of links with nested secondary groups.
   */
  primaryLinks: PrimaryLinkProps[];
  /**
   * Text label for the primary navigation for screen readers.
   * Important for accessibility.
   */
  primaryNavigationLabel: string;
  /**
   * Text label for the secondary navigation for screen readers.
   * Important for accessibility.
   */
  secondaryNavigationLabel: string;
}

const PRIMARY_NAVIGATION_WIDTH = '48px';
const PRIMARY_NAVIGATION_OPENED_WIDTH = '220px';
const LARGE_SCREEN_BREAKPOINT = '1920px'; // max breakpoint in circuit-ui is 1280px therefore we decided to hardcode for now

const wrapperStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilTera} {
    display: none;
  }
  ${theme.mq.tera} {
    min-width: ${PRIMARY_NAVIGATION_WIDTH};
    flex-shrink: 0;
  }
`;

const Wrapper = styled(SkeletonContainer)(wrapperStyles);

const primaryWrapperStyles = ({ theme }: StyleProps) => css`
  position: fixed;
  z-index: ${theme.zIndex.navigation};
  top: ${TOP_NAVIGATION_HEIGHT};
  bottom: 0;
  left: 0;
  height: calc(100vh - ${TOP_NAVIGATION_HEIGHT});
  width: ${theme.iconSizes.tera};
  display: flex;
  flex-direction: column;
  background-color: var(--cui-bg-normal);
  padding-top: ${theme.spacings.kilo};
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 1px 0 var(--cui-border-divider);
  transition: width ${theme.transitions.default},
    box-shadow ${theme.transitions.default};

  &:hover,
  &:focus-within {
    ${shadow()};
    width: ${PRIMARY_NAVIGATION_OPENED_WIDTH};
  }

  @media only screen and (min-width: ${LARGE_SCREEN_BREAKPOINT}) {
    width: ${PRIMARY_NAVIGATION_OPENED_WIDTH};
    &:hover,
    &:focus-within {
      box-shadow: 1px 0 var(--cui-border-divider);
    }
  }
`;

const PrimaryNavigationWrapper = styled.nav(
  primaryWrapperStyles,
  hideScrollbar,
);

const secondaryWrapperStyles = ({ theme }: StyleProps) => css`
  position: sticky;
  top: ${TOP_NAVIGATION_HEIGHT};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--cui-bg-normal);
  margin-left: ${PRIMARY_NAVIGATION_WIDTH};
  height: calc(100vh - ${TOP_NAVIGATION_HEIGHT});
  width: 200px;
  border-right: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
  @media only screen and (min-width: ${LARGE_SCREEN_BREAKPOINT}) {
    margin-left: ${PRIMARY_NAVIGATION_OPENED_WIDTH};
  }
`;

const SecondaryNavigationWrapper = styled.nav(secondaryWrapperStyles);

const listStyles = css`
  list-style: none;
`;

const headlineStyles = (theme: Theme) => css`
  margin: ${theme.spacings.giga} ${theme.spacings.mega} ${theme.spacings.kilo};
`;

export function DesktopNavigation({
  isLoading,
  primaryLinks,
  primaryNavigationLabel,
  secondaryNavigationLabel,
  ...props
}: DesktopNavigationProps): JSX.Element {
  const focusProps = useFocusList();

  const activePrimaryLink = primaryLinks.find((link) => link.isActive);
  const secondaryGroups =
    activePrimaryLink && activePrimaryLink.secondaryGroups;

  return (
    <Wrapper isLoading={Boolean(isLoading)}>
      <PrimaryNavigationWrapper {...props} aria-label={primaryNavigationLabel}>
        <ul role="list" css={listStyles}>
          {primaryLinks.map((link) => (
            <li key={link.label}>
              <PrimaryLink {...link} {...focusProps} />
            </li>
          ))}
        </ul>
      </PrimaryNavigationWrapper>
      {secondaryGroups && secondaryGroups.length > 0 && (
        <SecondaryNavigationWrapper
          {...props}
          aria-label={secondaryNavigationLabel}
        >
          <Skeleton css={headlineStyles}>
            <Headline as="h2" size="four">
              {activePrimaryLink && activePrimaryLink.label}
            </Headline>
          </Skeleton>
          <SecondaryLinks secondaryGroups={secondaryGroups} />
        </SecondaryNavigationWrapper>
      )}
    </Wrapper>
  );
}
