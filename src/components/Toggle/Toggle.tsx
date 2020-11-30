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

import React, { Ref } from 'react';
import { css } from '@emotion/core';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { disableVisually } from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';
import { Text, TextProps } from '../Text/Text';

import { Switch, SwitchProps } from './components/Switch/Switch';

export interface ToggleProps extends SwitchProps {
  /**
   * Describes the function of the toggle. Should not change depending on the state.
   */
  label: string;
  /**
   * Further explanation of the toggle. Can change depending on the state.
   */
  explanation?: string;
  /**
   * Removes the default bottom margin from the input.
   */
  noMargin?: boolean;
  /**
   * The ref to the html button dom element
   */
  ref?: Ref<HTMLButtonElement>;
}

const textWrapperStyles = ({ theme }: StyleProps) => css`
  label: toggle__text-wrapper;
  display: block;
  margin-left: ${theme.spacings.kilo};
  cursor: pointer;

  ${theme.mq.untilKilo} {
    margin-left: 0;
    margin-right: ${theme.spacings.kilo};
  }
`;

const ToggleTextWrapper = styled('label')<NoTheme>(textWrapperStyles);

const labelStyles = css`
  label: toggle__label;
  padding-top: 2px;
`;

const ToggleLabel = styled(Text)(labelStyles);

const explanationStyles = ({ theme }: StyleProps) => css`
  label: toggle__explanation;
  color: ${theme.colors.n700};
`;

const ToggleExplanation = styled(Text)<TextProps>(explanationStyles);

type WrapperElProps = Pick<ToggleProps, 'noMargin' | 'disabled'>;

const toggleWrapperStyles = ({ theme }: StyleProps) => css`
  label: toggle;
  display: flex;
  align-items: flex-start;
  margin-bottom: ${theme.spacings.mega};

  ${theme.mq.untilKilo} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const toggleWrapperDisabledStyles = ({ disabled }: WrapperElProps) =>
  disabled &&
  css`
    label: toggle--disabled;
    ${disableVisually()};
  `;

const toggleWrapperNoMarginStyles = ({ noMargin }: WrapperElProps) =>
  noMargin &&
  css`
    label: toggle--no-margin;
    margin-bottom: 0;
  `;

const ToggleWrapper = styled('div')<WrapperElProps>(
  toggleWrapperStyles,
  toggleWrapperDisabledStyles,
  toggleWrapperNoMarginStyles,
);

/**
 * A toggle component with support for labels and additional explanations.
 */
export const Toggle = React.forwardRef(
  (
    { label, explanation, noMargin, ...props }: ToggleProps,
    ref: ToggleProps['ref'],
  ) => {
    const switchId = uniqueId('toggle-switch_');
    const labelId = uniqueId('toggle-label_');
    return (
      <ToggleWrapper noMargin={noMargin} disabled={props.disabled}>
        <Switch {...props} aria-labelledby={labelId} id={switchId} ref={ref} />
        {(label || explanation) && (
          <ToggleTextWrapper id={labelId} htmlFor={switchId}>
            {label && (
              <ToggleLabel size="kilo" noMargin>
                {label}
              </ToggleLabel>
            )}
            {explanation && (
              <ToggleExplanation size="kilo" noMargin>
                {explanation}
              </ToggleExplanation>
            )}
          </ToggleTextWrapper>
        )}
      </ToggleWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
