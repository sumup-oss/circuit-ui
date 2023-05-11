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
import { Confirm, Notify } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

import { CLASS_DISABLED } from './constants';

export interface FieldValidationHintProps
  extends HTMLAttributes<HTMLSpanElement> {
  validationHint?: string;
  disabled?: boolean;
  invalid?: boolean;
  hasWarning?: boolean;
  showValid?: boolean;
}

const wrapperStyles = ({ theme }: StyleProps) => css`
  display: block;
  margin-top: ${theme.spacings.bit};
  margin-right: ${theme.spacings.bit};
  margin-left: ${theme.spacings.bit};
  color: var(--cui-fg-subtle);
  transition: color ${theme.transitions.default};

  [disabled] &,
  .${CLASS_DISABLED} & {
    color: var(--cui-fg-subtle-disabled);
  }
`;

const validStyles = ({
  theme,
  showValid,
}: StyleProps & FieldValidationHintProps) =>
  showValid &&
  css`
    color: var(--cui-fg-success);
    font-weight: ${theme.fontWeight.bold};

    [disabled] &,
    .${CLASS_DISABLED} & {
      color: var(--cui-fg-success-disabled);
    }
  `;

const warningStyles = ({
  theme,
  hasWarning,
}: StyleProps & FieldValidationHintProps) =>
  hasWarning &&
  css`
    color: var(--cui-fg-warning);
    font-weight: ${theme.fontWeight.bold};

    [disabled] &,
    .${CLASS_DISABLED} & {
      color: var(--cui-fg-warning-disabled);
    }
  `;

const invalidStyles = ({
  theme,
  invalid,
}: StyleProps & FieldValidationHintProps) =>
  invalid &&
  css`
    color: var(--cui-fg-danger);
    font-weight: ${theme.fontWeight.bold};

    [disabled] &,
    .${CLASS_DISABLED} & {
      color: var(--cui-fg-danger-disabled);
    }
  `;

const Wrapper = styled('span')<FieldValidationHintProps>(
  typography('two'),
  wrapperStyles,
  validStyles,
  invalidStyles,
  warningStyles,
);

const iconWrapperStyles = ({ theme }: StyleProps) =>
  css`
    display: inline-block;
    position: relative;
    width: ${theme.iconSizes.kilo};
    height: ${theme.iconSizes.kilo};
    vertical-align: text-top;
    margin-right: ${theme.spacings.bit};
  `;

const IconWrapper = styled('div')(
  iconWrapperStyles,
  validStyles,
  invalidStyles,
  warningStyles,
);

const getIcon = (props: FieldValidationHintProps) => {
  switch (true) {
    case props.disabled: {
      return null;
    }
    case props.invalid: {
      return (
        <IconWrapper>
          <Notify role="presentation" size="16" />
        </IconWrapper>
      );
    }
    case props.hasWarning: {
      return (
        <IconWrapper>
          <Notify role="presentation" size="16" />
        </IconWrapper>
      );
    }
    case props.showValid: {
      return (
        <IconWrapper>
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
  const icon = getIcon(props);
  const hasMessage = Boolean(validationHint);
  const isStatusMessage = Boolean(
    props.invalid || props.hasWarning || props.showValid,
  );

  return (
    <>
      {hasMessage && !isStatusMessage && (
        <Wrapper {...props}>
          {icon}
          {validationHint}
        </Wrapper>
      )}
      <span role="status" aria-live="polite">
        {hasMessage && isStatusMessage && (
          <Wrapper {...props}>
            {icon}
            {validationHint}
          </Wrapper>
        )}
      </span>
    </>
  );
};
