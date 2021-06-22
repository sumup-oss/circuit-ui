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

import { Ref, forwardRef } from 'react';
import { css } from '@emotion/core';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { disableVisually } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { Body, BodyProps } from '../Body/Body';

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

const explanationStyles = ({ theme }: StyleProps) => css`
  label: toggle__explanation;
  color: ${theme.colors.n700};
`;

const ToggleExplanation = styled(Body)<BodyProps>(explanationStyles);

type WrapperElProps = Pick<ToggleProps, 'disabled'>;

const toggleWrapperStyles = ({ theme }: StyleProps) => css`
  label: toggle;
  display: flex;
  align-items: flex-start;

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

const ToggleWrapper = styled('div')<WrapperElProps>(
  toggleWrapperStyles,
  toggleWrapperDisabledStyles,
);

/**
 * A toggle component with support for labels and additional explanations.
 */
export const Toggle = forwardRef(
  ({ label, explanation, ...props }: ToggleProps, ref: ToggleProps['ref']) => {
    const switchId = uniqueId('toggle-switch_');
    const labelId = uniqueId('toggle-label_');
    return (
      <ToggleWrapper disabled={props.disabled}>
        <Switch {...props} aria-labelledby={labelId} id={switchId} ref={ref} />
        {(label || explanation) && (
          <ToggleTextWrapper id={labelId} htmlFor={switchId}>
            {label && <Body size="one">{label}</Body>}
            {explanation && (
              <ToggleExplanation size="two">{explanation}</ToggleExplanation>
            )}
          </ToggleTextWrapper>
        )}
      </ToggleWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
