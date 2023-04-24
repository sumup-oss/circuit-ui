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

import { Ref, forwardRef, HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled.js';
import Button, { ButtonProps } from '../Button/index.js';
import { secondaryStyles, tertiaryStyles } from '../Button/Button.jsx';

type Action = Omit<ButtonProps, 'variant'>;

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'align'> {
  /**
   * The buttons to group. Expects a primary and optionally a secondary button.
   */
  actions: {
    primary: Action;
    secondary?: Action;
  };
  /**
   * Direction to align the buttons. Defaults to `center`.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLDivElement>;
}

const alignmentMap = {
  left: 'flex-end',
  center: 'center',
  right: 'flex-start',
} as const;

type WrapperProps = Omit<ButtonGroupProps, 'actions'>;

const wrapperStyles = ({
  theme,
  align = 'center',
}: StyleProps & WrapperProps) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${theme.mq.kilo} {
    flex-direction: row-reverse;
    justify-content: ${alignmentMap[align]};
  }
`;

const Wrapper = styled('div')<WrapperProps>(wrapperStyles);

const secondaryButtonStyles = ({
  theme,
  destructive,
}: ButtonProps & StyleProps) => css`
  ${theme.mq.kilo} {
    margin-right: ${theme.spacings.mega};
    ${secondaryStyles({ variant: 'secondary', destructive })}
  }
  ${theme.mq.untilKilo} {
    margin-right: 0;
    margin-top: ${theme.spacings.mega};
    ${tertiaryStyles({ variant: 'tertiary', destructive })}
  }
`;

const SecondaryButton = styled(Button)<ButtonProps>(secondaryButtonStyles);

/**
 * The ButtonGroup component groups and formats two buttons.
 */
export const ButtonGroup = forwardRef(
  ({ actions, ...props }: ButtonGroupProps, ref: ButtonGroupProps['ref']) => (
    <Wrapper {...props} ref={ref}>
      <Button {...actions.primary} variant="primary" />
      {actions.secondary && <SecondaryButton {...actions.secondary} />}
    </Wrapper>
  ),
);

ButtonGroup.displayName = 'ButtonGroup';
