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

import { ReactNode, ChangeEvent, Ref } from 'react';
import { includes } from 'lodash/fp';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import Selector from '../Selector';
import { SelectorSize } from '../Selector/Selector';

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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
   * The ref to the HTML Dom element
   */
  ref?: Ref<HTMLDivElement>;
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
  label: selector-group;
  display: flex;
  flex-direction: row;
  width: 100%;

  > div {
    &:not(:last-child) {
      margin-right: ${theme.spacings.mega};
    }
  }
`;

const StyledSelectorGroup = styled.div(baseStyles, stretchStyles);

const OptionItem = styled.div`
  label: selector-group__option-item;
  flex-grow: 1;
`;

const StyledSelector = styled(Selector)`
  width: 100%;
`;

/**
 * A group of Selectors.
 */
export const SelectorGroup = React.forwardRef(
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
      ...rest
    }: SelectorGroupProps,
    ref: SelectorGroupProps['ref'],
  ) => {
    const name = customName || uniqueId('selector-group_');

    return (
      <StyledSelectorGroup
        role="group"
        aria-label={label}
        ref={ref}
        stretch={stretch}
        {...rest}
      >
        {options &&
          options.map(({ children, value, ...optionRest }) => (
            <OptionItem key={value}>
              <StyledSelector
                name={name}
                onChange={onChange}
                multiple={multiple}
                value={value}
                size={size}
                noMargin
                checked={
                  multiple
                    ? includes(value, activeValue)
                    : value === activeValue
                }
                {...optionRest}
              >
                {children}
              </StyledSelector>
            </OptionItem>
          ))}
      </StyledSelectorGroup>
    );
  },
);

SelectorGroup.displayName = 'SelectorGroup';
