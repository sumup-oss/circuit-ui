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

import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import { find } from 'lodash/fp';

import styled, { StyleProps } from '../../../../styles/styled';
import { shadow, hideScrollbar } from '../../../../styles/style-mixins';
import { useFocusList } from '../../../../hooks/useFocusList';
import { TOP_NAVIGATION_HEIGHT } from '../../../TopNavigation/TopNavigation';
import Headline from '../../../Headline';
import { PrimaryLinkProps } from '../../types';
import { SecondaryLinks } from '../SecondaryLinks';
import { PrimaryLink } from '../PrimaryLink';

export interface DesktopNavigationProps {
  /**
   * TODO: Add description
   */
  primaryLinks: PrimaryLinkProps[];
  /**
   * TODO: Add description
   */
  primaryNavigationLabel: string;
  /**
   * TODO: Add description
   */
  secondaryNavigationLabel: string;
}

const PRIMARY_NAVIGATION_WIDTH = '48px';

const wrapperStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilGiga} {
    display: none;
  }
  ${theme.mq.giga} {
    min-width: ${PRIMARY_NAVIGATION_WIDTH};
    flex-shrink: 0;
  }
`;

const Wrapper = styled.div(wrapperStyles);

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
  background-color: ${theme.colors.bodyBg};
  padding-top: ${theme.spacings.kilo};
  overflow-y: auto;
  box-shadow: 1px 0 ${theme.colors.n200};
  transition: width ${theme.transitions.default},
    box-shadow ${theme.transitions.default};

  &:hover,
  &:focus-within {
    ${shadow(theme)};
    width: 220px;
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
  background-color: ${theme.colors.white};
  margin-left: ${PRIMARY_NAVIGATION_WIDTH};
  height: calc(100vh - ${TOP_NAVIGATION_HEIGHT});
  width: 200px;
  border-right: ${theme.borderWidth.kilo} solid ${theme.colors.n200};
`;

const SecondaryNavigationWrapper = styled.nav(secondaryWrapperStyles);

const listStyles = css`
  list-style: none;
`;

const headlineStyles = (theme: Theme) => css`
  padding: ${theme.spacings.giga} ${theme.spacings.mega} ${theme.spacings.kilo};
`;

export function DesktopNavigation({
  primaryLinks,
  primaryNavigationLabel,
  secondaryNavigationLabel,
  ...props
}: DesktopNavigationProps): JSX.Element {
  const focusProps = useFocusList();

  const activePrimaryLink = find(
    (link) => link.isActive,
    primaryLinks,
  ) as PrimaryLinkProps;
  const secondaryGroups =
    activePrimaryLink && activePrimaryLink.secondaryGroups;

  return (
    <Wrapper>
      <PrimaryNavigationWrapper {...props} aria-label={primaryNavigationLabel}>
        <ul role="list" css={listStyles}>
          {primaryLinks.map((link) => (
            <li key={link.label}>
              <PrimaryLink {...link} {...focusProps} />
            </li>
          ))}
        </ul>
      </PrimaryNavigationWrapper>
      {secondaryGroups && (
        <SecondaryNavigationWrapper
          {...props}
          aria-label={secondaryNavigationLabel}
        >
          <Headline as="h2" size="four" css={headlineStyles} noMargin>
            {activePrimaryLink && activePrimaryLink.label}
          </Headline>
          <SecondaryLinks secondaryGroups={secondaryGroups} />
        </SecondaryNavigationWrapper>
      )}
    </Wrapper>
  );
}
