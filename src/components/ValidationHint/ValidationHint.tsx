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

import React, { FC, HTMLProps } from 'react';
import { css } from '@emotion/core';
import { CircleCheckmark, CircleWarning, CircleCross } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { textKilo } from '../../styles/style-helpers';

export interface ValidationHintProps extends HTMLProps<HTMLSpanElement> {
  validationHint?: string;
  disabled?: boolean;
  invalid?: boolean;
  hasWarning?: boolean;
  showValid?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: validation-hint;
  ${textKilo({ theme })};
  display: flex;
  align-items: center;
  margin-top: ${theme.spacings.bit};
  color: ${theme.colors.n700};
  transition: color ${theme.transitions.default};
`;

const invalidStyles = ({ theme, invalid }: StyleProps & ValidationHintProps) =>
  invalid &&
  css`
    label: validation-hint--invalid;
    color: ${theme.colors.danger};
  `;

const Wrapper = styled('span')<ValidationHintProps>(baseStyles, invalidStyles);

const iconStyles = (color: 'danger' | 'warning' | 'success') => (
  theme: Theme
) => css`
  label: ${`validation-hint__icon--${color}`};
  width: ${theme.iconSizes.kilo};
  height: ${theme.iconSizes.kilo};
  margin-right: ${theme.spacings.bit};
  color: ${theme.colors[color]};
`;

const getIcon = (state: ValidationHintProps) => {
  switch (true) {
    case state.disabled: {
      return null;
    }
    case state.invalid: {
      return <CircleCross role="presentation" css={iconStyles('danger')} />;
    }
    case state.hasWarning: {
      return <CircleWarning role="presentation" css={iconStyles('warning')} />;
    }
    case state.showValid: {
      return (
        <CircleCheckmark role="presentation" css={iconStyles('success')} />
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
export const ValidationHint: FC<ValidationHintProps> = ({
  validationHint,
  ...props
}) => {
  if (!validationHint) {
    return null;
  }

  const icon = getIcon(props);

  return (
    <Wrapper invalid={props.invalid}>
      {icon}
      {validationHint}
    </Wrapper>
  );
};
