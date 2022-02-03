/**
 * Copyright 2022, SumUp Ltd.
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

import { css } from '@emotion/react';
import { ArrowLeft, Close } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled';
import { IconButton } from '../../../IconButton/IconButton';
import Headline from '../../../Headline';
import { SidePanelProps } from '../../SidePanel';

type HeaderStickyProps = { isSticky: boolean };

type HeaderProps = HeaderStickyProps &
  Pick<
    SidePanelProps,
    'backButtonLabel' | 'closeButtonLabel' | 'headline' | 'onBack' | 'onClose'
  >;

const headerContainerStyles = ({ theme }: StyleProps) => css`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  margin-right: ${theme.borderWidth.kilo};
  z-index: ${theme.zIndex.absolute};

  ${theme.mq.mega} {
    box-shadow: inset ${theme.borderWidth.kilo} 0px 0px ${theme.colors.n300};
  }
`;

const headerContainerStickyStyles = ({
  theme,
  isSticky,
}: StyleProps & HeaderStickyProps) =>
  isSticky &&
  css`
    box-shadow: inset 0px -${theme.borderWidth.kilo} 0px ${theme.colors.n300};

    ${theme.mq.mega} {
      box-shadow: inset ${theme.borderWidth.kilo} -${theme.borderWidth.kilo} 0px
        ${theme.colors.n300};
    }
  `;

const HeaderContainer = styled.div(
  headerContainerStyles,
  headerContainerStickyStyles,
);

const iconButtonStyles = ({ theme }: StyleProps) => css`
  flex: none;
  margin: ${theme.spacings.bit};
  border-color: transparent !important;
`;

const StyledIconButton = styled(IconButton)(iconButtonStyles);

type HeadlineProps = { noBackButton: boolean };

const headlineStyles = css`
  flex: 1 1 auto;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const headlineNoBackStyles = ({
  theme,
  noBackButton,
}: StyleProps & HeadlineProps) =>
  noBackButton &&
  css`
    margin-left: ${theme.spacings.zetta};
  `;

const StyledHeadline = styled(Headline)(headlineStyles, headlineNoBackStyles);

export const Header = ({
  backButtonLabel,
  closeButtonLabel,
  headline,
  onBack,
  onClose,
  isSticky,
}: HeaderProps): JSX.Element => (
  <HeaderContainer isSticky={isSticky}>
    {onBack && backButtonLabel && (
      <StyledIconButton type="button" label={backButtonLabel} onClick={onBack}>
        <ArrowLeft size="24" />
      </StyledIconButton>
    )}
    <StyledHeadline size="four" as="h2" noMargin noBackButton={!onBack}>
      {headline}
    </StyledHeadline>
    {closeButtonLabel && (
      <StyledIconButton
        type="button"
        label={closeButtonLabel}
        onClick={onClose}
      >
        <Close size="24" />
      </StyledIconButton>
    )}
  </HeaderContainer>
);
