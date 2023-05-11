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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { hideVisually } from '../../styles/style-mixins';
import { StyleProps } from '../../styles/styled';

import { CLASS_DISABLED } from './constants';

export interface FieldLabelTextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * A clear and concise description of the input purpose.
   */
  label: string;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * The `optionalLabel` is only shown when the input is not required.
   */
  required?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  margin-right: ${theme.spacings.bit};
  margin-bottom: ${theme.spacings.bit};
  margin-left: ${theme.spacings.bit};
  font-weight: ${theme.fontWeight.bold};

  [disabled] &,
  .${CLASS_DISABLED} & {
    color: var(--cui-fg-normal-disabled);
  }
`;

const hiddenStyles = ({ hideLabel }: Pick<FieldLabelTextProps, 'hideLabel'>) =>
  hideLabel && hideVisually();

const Text = styled('span')(baseStyles, hiddenStyles);

const optionalStyles = ({ theme }: StyleProps) => css`
  color: var(--cui-fg-subtle);
  font-weight: ${theme.fontWeight.regular};
  font-style: italic;

  [disabled] &,
  .${CLASS_DISABLED} & {
    color: var(--cui-fg-subtle-disabled);
  }
`;

const Optional = styled('span')(optionalStyles);

/**
 * @private
 */
export function FieldLabelText({
  label,
  hideLabel,
  optionalLabel,
  required,
}: FieldLabelTextProps) {
  return (
    <Text hideLabel={hideLabel}>
      {label}
      {optionalLabel && !required ? (
        <Optional>{` (${optionalLabel})`}</Optional>
      ) : null}
    </Text>
  );
}
