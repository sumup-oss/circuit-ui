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
import { deprecate } from '../../util/logger';
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
   * Removes the default bottom margin from the Toggle.
   */
  noMargin?: boolean;
  /**
   * The ref to the HTML DOM button element
   */
  ref?: Ref<HTMLButtonElement>;
}

const textWrapperStyles = ({ theme }: StyleProps) => css`
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
  color: ${theme.colors.n700};
`;

const ToggleExplanation = styled(Body)<BodyProps>(explanationStyles);

type WrapperElProps = Pick<ToggleProps, 'noMargin' | 'disabled'>;

const toggleWrapperStyles = ({ theme }: StyleProps) => css`
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
    ${disableVisually()};
  `;

const toggleWrapperNoMarginStyles = ({ noMargin }: WrapperElProps) => {
  if (!noMargin) {
    deprecate(
      'Toggle',
      'The default outer spacing in the Toggle component is deprecated.',
      'Use the `noMargin` prop to silence this warning.',
      'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
    );
    return null;
  }
  return css`
    margin-bottom: 0;
  `;
};

const ToggleWrapper = styled('div')<WrapperElProps>(
  toggleWrapperStyles,
  toggleWrapperDisabledStyles,
  toggleWrapperNoMarginStyles,
);

/**
 * A toggle component with support for labels and additional explanations.
 */
export const Toggle = forwardRef(
  (
    { label, explanation, noMargin, ...props }: ToggleProps,
    ref: ToggleProps['ref'],
  ) => {
    if (
      process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new Error(
        'The Toggle component is missing a `label` prop. This is an accessibility requirement.',
      );
    }
    const switchId = uniqueId('toggle-switch_');
    const labelId = uniqueId('toggle-label_');
    return (
      <ToggleWrapper noMargin={noMargin} disabled={props.disabled}>
        <Switch {...props} aria-labelledby={labelId} id={switchId} ref={ref} />
        <ToggleTextWrapper id={labelId} htmlFor={switchId}>
          <Body noMargin>{label}</Body>
          {explanation && (
            <ToggleExplanation size="two" noMargin>
              {explanation}
            </ToggleExplanation>
          )}
        </ToggleTextWrapper>
      </ToggleWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
