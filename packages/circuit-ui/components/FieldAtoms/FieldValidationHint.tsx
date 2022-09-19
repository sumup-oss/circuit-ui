/**
 * Copyright 2020, SumUp Ltd.
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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { Confirm, NotifyCircle, Alert } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

type Color = 'alert' | 'notify' | 'confirm';

export interface FieldValidationHintProps
  extends HTMLAttributes<HTMLSpanElement> {
  validationHint?: string;
  disabled?: boolean;
  invalid?: boolean;
  hasWarning?: boolean;
  showValid?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  display: block;
  margin-top: ${theme.spacings.bit};
  color: ${theme.colors.n700};
  transition: color ${theme.transitions.default};
`;

const validStyles = ({
  theme,
  showValid,
}: StyleProps & FieldValidationHintProps) =>
  showValid &&
  css`
    color: ${theme.colors.confirm};
  `;

const warningStyles = ({
  theme,
  hasWarning,
}: StyleProps & FieldValidationHintProps) =>
  hasWarning &&
  css`
    color: ${theme.colors.bodyColor};
  `;

const invalidStyles = ({
  theme,
  invalid,
}: StyleProps & FieldValidationHintProps) =>
  invalid &&
  css`
    color: ${theme.colors.alert};
  `;

const Wrapper = styled('span')<FieldValidationHintProps>(
  typography('two'),
  baseStyles,
  validStyles,
  invalidStyles,
  warningStyles,
);

const IconWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'color',
})(
  ({ theme, color }: StyleProps & { color: Color }) =>
    css`
      display: inline-block;
      position: relative;
      width: ${theme.iconSizes.kilo};
      height: ${theme.iconSizes.kilo};
      vertical-align: text-top;
      margin-right: ${theme.spacings.bit};
      color: ${theme.colors[color]};
    `,
  ({ theme, color }: StyleProps & { color: Color }) =>
    color === 'notify' &&
    css`
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background: ${theme.colors.black};
        border-radius: ${theme.borderRadius.circle};
      }
      svg {
        position: relative;
        z-index: 1;
      }
    `,
);

const getIcon = (state: FieldValidationHintProps) => {
  switch (true) {
    case state.disabled: {
      return null;
    }
    case state.invalid: {
      return (
        <IconWrapper color="alert">
          <Alert role="presentation" size="16" />
        </IconWrapper>
      );
    }
    case state.hasWarning: {
      return (
        <IconWrapper color="notify">
          <NotifyCircle role="presentation" size="16" />
        </IconWrapper>
      );
    }
    case state.showValid: {
      return (
        <IconWrapper color="confirm">
          <Confirm role="presentation" size="16" />
        </IconWrapper>
      );
    }
    default: {
      return null;
    }
  }
};

/**
 * @private
 */
export const FieldValidationHint = ({
  validationHint,
  ...props
}: FieldValidationHintProps): JSX.Element | null => {
  if (!validationHint) {
    return null;
  }

  const icon = getIcon(props);

  return (
    <Wrapper
      {...props}
      invalid={props.invalid}
      showValid={props.showValid}
      hasWarning={props.hasWarning}
    >
      {icon}
      {validationHint}
    </Wrapper>
  );
};
