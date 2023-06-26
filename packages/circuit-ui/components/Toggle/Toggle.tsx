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

import { Ref, forwardRef, useId } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled.js';
import { Body } from '../Body/Body.js';
import { AccessibilityError } from '../../util/errors.js';
import { FieldDescription, FieldWrapper } from '../Field/index.js';
import { hideVisually } from '../../styles/style-mixins.js';

import { Switch, SwitchProps } from './components/Switch/Switch.js';

export interface ToggleProps extends SwitchProps {
  /**
   * Describes the function of the toggle. Should not change depending on the state.
   */
  label: string;
  /**
   * Further explanation of the toggle. Can change depending on the state.
   */
  description?: string;
  /**
   * The ref to the HTML DOM button element
   */
  ref?: Ref<HTMLButtonElement>;
}

const labelStyles = ({ theme }: StyleProps) => css`
  display: block;
  margin-left: ${theme.spacings.kilo};
  cursor: pointer;

  ${theme.mq.untilKilo} {
    margin-left: 0;
    margin-right: ${theme.spacings.kilo};
  }

  [data-disabled='true'] & {
    color: var(--cui-fg-normal-disabled);
  }
`;

// This component is rendered as a `label` element below.
const ToggleLabel = styled(Body)<{ htmlFor: string }>(labelStyles);

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
  (
    {
      label,
      description,
      'aria-describedby': describedBy,
      ...props
    }: ToggleProps,
    ref: ToggleProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError('Toggle', 'The `label` prop is missing.');
    }

    const switchId = useId();
    const labelId = useId();
    const descriptionId = useId();

    const descriptionIds = [describedBy, description && descriptionId]
      .filter(Boolean)
      .join(' ');

    return (
      <FieldWrapper disabled={props.disabled} css={wrapperStyles}>
        <Switch
          {...props}
          aria-labelledby={labelId}
          aria-describedby={descriptionIds}
          id={switchId}
          ref={ref}
        />
        <ToggleLabel as="label" id={labelId} htmlFor={switchId}>
          {label}
          {description && (
            <FieldDescription aria-hidden="true">
              {description}
            </FieldDescription>
          )}
        </ToggleLabel>
        {description && (
          <p id={descriptionId} css={hideVisually}>
            {description}
          </p>
        )}
      </FieldWrapper>
    );
  },
);

Toggle.displayName = 'Toggle';
