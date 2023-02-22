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
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import { Body, BodyProps } from '../Body/Body';
import { AccessibilityError } from '../../util/errors';
import { FieldWrapper } from '../FieldAtoms';
import { CLASS_DISABLED } from '../FieldAtoms/constants';

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

  .${CLASS_DISABLED} & {
    color: var(--cui-fg-normal-disabled);
  }
`;

const ToggleTextWrapper = styled('label')(textWrapperStyles);

const explanationStyles = css`
  color: var(--cui-fg-subtle);
`;

const ToggleExplanation = styled(Body)<BodyProps>(explanationStyles);

const wrapperStyles = (theme: Theme) => css`
  display: flex;
  align-items: flex-start;

  ${theme.mq.untilKilo} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

/**
 * A toggle component with support for labels and additional explanations.
 */
export const Toggle = forwardRef(
  ({ label, explanation, ...props }: ToggleProps, ref: ToggleProps['ref']) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError('Toggle', 'The `label` prop is missing.');
    }

    const switchId = uniqueId('toggle-switch_');
    const labelId = uniqueId('toggle-label_');
    return (
      <FieldWrapper disabled={props.disabled} css={wrapperStyles}>
        <Switch {...props} aria-labelledby={labelId} id={switchId} ref={ref} />
        <ToggleTextWrapper id={labelId} htmlFor={switchId}>
          <Body>{label}</Body>
          {explanation && (
            <ToggleExplanation size="two">{explanation}</ToggleExplanation>
          )}
        </ToggleTextWrapper>
      </FieldWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
