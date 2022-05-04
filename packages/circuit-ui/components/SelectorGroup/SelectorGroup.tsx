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

import { ReactNode, Ref, forwardRef, ChangeEventHandler } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import Selector from '../Selector';
import { SelectorSize } from '../Selector/Selector';
import { hideVisually, typography } from '../../styles/style-mixins';

export interface SelectorGroupProps {
  /**
   * A collection of available options. Each option must have at least
   * a value and children.
   */
  options: {
    value: string;
    children: ReactNode;
    disabled?: boolean;
  }[];
  /**
   * Controls/Toggles the checked state. Passed on to the Selectors.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * The value of the currently checked Selector.
   */
  value: string | string[];
  /**
   * A visually hidden description of the selector group for screen readers.
   */
  label: string;
  /**
   * A unique name for the radio group.
   */
  name?: string;
  /**
   * Whether the user can select multiple options.
   */
  multiple?: boolean;
  /**
   * Size of the Selectors within the group. Default: 'mega'.
   */
  size?: SelectorSize;
  /**
   * Whether the group should take the whole width available. Default: true.
   */
  stretch?: boolean;
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLFieldSetElement>;
}

type ContainerProps = Pick<SelectorGroupProps, 'stretch'>;

const stretchStyles = ({ stretch = false }: StyleProps & ContainerProps) => {
  if (stretch) {
    return css`
      display: flex;
      align-items: stretch;
      width: 100%;
    `;
  }

  return css`
    display: inline-flex;
    align-items: flex-start;
    width: auto;
  `;
};

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: row;
  width: 100%;

  > div:not(:last-child) {
    margin-right: ${theme.spacings.mega};
  }
`;

const Fieldset = styled.fieldset(baseStyles, stretchStyles);

type LegendProps = Pick<SelectorGroupProps, 'hideLabel'>;

const legendStyles = ({ theme }: StyleProps) => css`
  margin-bottom: ${theme.spacings.bit};
`;

const legendHiddenStyles = ({ hideLabel }: LegendProps) =>
  hideLabel && hideVisually();

const Legend = styled('legend')<LegendProps>(
  typography('two'),
  legendStyles,
  legendHiddenStyles,
);

const OptionItem = styled.div`
  flex: 1;
`;

/**
 * A group of Selectors.
 */
export const SelectorGroup = forwardRef(
  (
    {
      options,
      onChange,
      value: activeValue,
      name: customName,
      label,
      multiple,
      size,
      stretch,
      hideLabel,
      ...rest
    }: SelectorGroupProps,
    ref: SelectorGroupProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new Error(
        'The SelectorGroup component is missing a `label` prop. This is an accessibility requirement. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const name = customName || uniqueId('selector-group_');

    if (!options) {
      return null;
    }

    return (
      <Fieldset ref={ref} stretch={stretch} {...rest}>
        <Legend hideLabel={hideLabel}>{label}</Legend>
        {options.map(({ children, value, ...optionRest }) => (
          <OptionItem key={value}>
            <Selector
              name={name}
              onChange={onChange}
              multiple={multiple}
              value={value}
              size={size}
              css={css`
                width: 100%;
              `}
              checked={
                multiple ? activeValue.includes(value) : value === activeValue
              }
              noMargin
              {...optionRest}
            >
              {children}
            </Selector>
          </OptionItem>
        ))}
      </Fieldset>
    );
  },
);

SelectorGroup.displayName = 'SelectorGroup';
