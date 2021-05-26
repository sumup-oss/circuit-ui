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

/** @jsxRuntime classic */
/** @jsx jsx */
import React, { ReactNode, ChangeEvent, Ref } from 'react';
import { includes } from 'lodash/fp';
import { css, jsx } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import Selector from '../Selector';
import { SelectorSize } from '../Selector/Selector';

type GapSize = 'kilo' | 'mega';

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
   * Whether to layout Selectors in a row or a column. Default: 'horizontal'.
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Size of the Selectors within the group. Default: 'mega'.
   */
  size?: SelectorSize;
  /**
   * Spacing between selectors in a group. Default: 'kilo'.
   */
  gapSize?: GapSize;
  /**
   * Whether the group should take the whole width available. Default: true.
   */
  stretch?: boolean;
  /**
   * The ref to the HTML Dom element
   */
  ref?: Ref<HTMLDivElement>;
}

type ContainerProps = Pick<
  SelectorGroupProps,
  'orientation' | 'gapSize' | 'stretch'
>;

const stretchStyles = ({ stretch = false }: StyleProps & ContainerProps) => css`
  display: ${stretch ? 'flex' : 'inline-flex'};
  align-items: ${stretch ? 'stretch' : 'flex-start'};
  width: ${stretch ? '100%' : 'auto'};
`;

const orientationStyles = ({
  theme,
  gapSize = 'mega',
  orientation = 'horizontal',
}: StyleProps & ContainerProps) => css`
  flex-direction: ${orientation === 'vertical' ? 'column' : 'row'};

  > div {
    &:not(:last-child) {
      margin-right: ${orientation === 'horizontal'
        ? theme.spacings[gapSize]
        : 0};
      margin-bottom: ${orientation === 'vertical'
        ? theme.spacings[gapSize]
        : 0};
    }
  }
`;

const baseStyles = () => css`
  label: selector-group;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledSelectorGroup = styled.div(
  baseStyles,
  stretchStyles,
  orientationStyles,
);

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
      gapSize,
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
        gapSize={gapSize}
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
