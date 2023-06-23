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
import { Confirm, Notify, Alert } from '@sumup/icons';

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
  display: flex;
  margin-top: ${theme.spacings.bit};
  color: var(--cui-fg-subtle);
  transition: color ${theme.transitions.default};

  [disabled] &,
  .${CLASS_DISABLED} & {
    color: var(--cui-fg-subtle-disabled);
  }
`;

const validStyles = ({ showValid }: FieldValidationHintProps) =>
  showValid &&
  css`
    color: var(--cui-fg-success);

    [disabled] &,
    .${CLASS_DISABLED} & {
      color: var(--cui-fg-success-disabled);
    }
  `;

const warningStyles = ({ hasWarning }: FieldValidationHintProps) =>
  hasWarning &&
  css`
    color: var(--cui-fg-warning);

    [disabled] &,
    .${CLASS_DISABLED} & {
      color: var(--cui-fg-warning-disabled);
    }
  `;

const invalidStyles = ({ invalid }: FieldValidationHintProps) =>
  invalid &&
  css`
    color: var(--cui-fg-danger);

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
    display: block;
    align-self: flex-start;
    flex-shrink: 0;
    width: ${theme.iconSizes.kilo};
    height: ${theme.iconSizes.kilo};
    margin-top: calc(
      (${theme.typography.body.two.lineHeight} - ${theme.iconSizes.kilo}) / 2
    );
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
          <Alert role="presentation" size="16" />
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
