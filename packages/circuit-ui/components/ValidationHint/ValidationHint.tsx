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

import { HTMLProps } from 'react';
import { css } from '@emotion/core';
import { Confirm, Notify, Alert } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

export interface ValidationHintProps extends HTMLProps<HTMLSpanElement> {
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

const validStyles = ({ theme, showValid }: StyleProps & ValidationHintProps) =>
  showValid &&
  css`
    color: ${theme.colors.success};
  `;

const invalidStyles = ({ theme, invalid }: StyleProps & ValidationHintProps) =>
  invalid &&
  css`
    color: ${theme.colors.danger};
  `;

const Wrapper = styled('span')<ValidationHintProps>(
  typography('two'),
  baseStyles,
  validStyles,
  invalidStyles,
);

const iconStyles = (color: 'danger' | 'warning' | 'success') => (
  theme: Theme,
) => css`
  display: inline-block;
  width: ${theme.iconSizes.kilo};
  height: ${theme.iconSizes.kilo};
  vertical-align: text-top;
  margin-right: ${theme.spacings.bit};
  color: ${theme.colors[color]};
`;

const getIcon = (state: ValidationHintProps) => {
  switch (true) {
    case state.disabled: {
      return null;
    }
    case state.invalid: {
      return <Alert role="presentation" css={iconStyles('danger')} />;
    }
    case state.hasWarning: {
      return <Notify role="presentation" css={iconStyles('warning')} />;
    }
    case state.showValid: {
      return <Confirm role="presentation" css={iconStyles('success')} />;
    }
    default: {
      return null;
    }
  }
};

/**
 * @private
 */
export const ValidationHint = ({
  validationHint,
  ...props
}: ValidationHintProps): JSX.Element | null => {
  if (!validationHint) {
    return null;
  }

  const icon = getIcon(props);

  return (
    <Wrapper invalid={props.invalid} showValid={props.showValid}>
      {icon}
      {validationHint}
    </Wrapper>
  );
};
