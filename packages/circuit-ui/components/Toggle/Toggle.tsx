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
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import { Body, BodyProps } from '../Body/Body';
import { AccessibilityError, DeprecationError } from '../../util/errors';
import { FieldWrapper } from '../FieldAtoms';

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
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
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

const ToggleTextWrapper = styled('label')(textWrapperStyles);

const explanationStyles = ({ theme }: StyleProps) => css`
  color: ${theme.colors.n700};
`;

const ToggleExplanation = styled(Body)<BodyProps>(explanationStyles);

type WrapperElProps = Pick<ToggleProps, 'noMargin' | 'disabled'>;

const wrapperStyles = ({ theme }: StyleProps) => css`
  display: flex;
  align-items: flex-start;

  ${theme.mq.untilKilo} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const ToggleWrapper = styled(FieldWrapper)<WrapperElProps>(wrapperStyles);

/**
 * A toggle component with support for labels and additional explanations.
 */
export const Toggle = forwardRef(
  (
    { label, explanation, noMargin, ...props }: ToggleProps,
    ref: ToggleProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError('Toggle', 'The `label` prop is missing.');
    }

    if (
      process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !noMargin
    ) {
      throw new DeprecationError(
        'Toggle',
        'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#runtime-errors-for-missing-nomargin-props.',
      );
    }

    const switchId = uniqueId('toggle-switch_');
    const labelId = uniqueId('toggle-label_');
    return (
      <ToggleWrapper noMargin={noMargin} disabled={props.disabled}>
        <Switch {...props} aria-labelledby={labelId} id={switchId} ref={ref} />
        <ToggleTextWrapper id={labelId} htmlFor={switchId}>
          <Body>{label}</Body>
          {explanation && (
            <ToggleExplanation size="two">{explanation}</ToggleExplanation>
          )}
        </ToggleTextWrapper>
      </ToggleWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
