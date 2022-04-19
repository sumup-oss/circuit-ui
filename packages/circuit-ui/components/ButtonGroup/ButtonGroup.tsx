/**
 * Copyright 2019, SumUp Ltd.
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

import { forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import Button, { ButtonProps } from '../Button';

type Action = Omit<ButtonProps, 'variant'>;

export interface ButtonGroupProps {
  /**
   * Direction to align the content. Either left/right
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Action Buttons
   */
  actions: {
    primary: Action;
    secondary?: Action;
  };
}

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

type ActionsWrapperProps = Omit<ButtonGroupProps, 'actions'>;

const alignmentStyles = ({ align = 'right' }: ActionsWrapperProps) => css`
  justify-content: ${alignmentMap[align]};
`;

const actionWrapperStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${theme.mq.kilo} {
    flex-direction: row;
  }
`;

const secondaryButtonStyles = ({ theme }: StyleProps) => css`
  margin-right: ${theme.spacings.mega};
  ${theme.mq.untilKilo} {
    display: none;
  }
`;

const SecondaryButton = styled(Button)<ButtonProps>(secondaryButtonStyles);

const tertiaryButtonStyles = ({ theme }: StyleProps) => css`
  margin-top: ${theme.spacings.mega};
  ${theme.mq.kilo} {
    display: none;
  }
`;

const TertiaryButton = styled(Button)<ButtonProps>(tertiaryButtonStyles);

const ActionsWrapper = styled('div')<ActionsWrapperProps>(
  actionWrapperStyles,
  alignmentStyles,
);

/**
 * Groups its Button children into a list and adds margins between.
 */
export const ButtonGroup = forwardRef(
  ({ actions, ...props }: ButtonGroupProps) => (
    <ActionsWrapper {...props}>
      {actions.secondary && (
        <SecondaryButton {...actions.secondary} variant="secondary" />
      )}

      <Button {...actions.primary} variant="primary" />

      {actions.secondary && (
        <TertiaryButton {...actions.secondary} variant="tertiary" />
      )}
    </ActionsWrapper>
  ),
);

ButtonGroup.displayName = 'ButtonGroup';
