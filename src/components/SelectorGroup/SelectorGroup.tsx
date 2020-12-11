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

/** @jsx jsx */
import React, { ReactNode, ChangeEvent, Ref } from 'react';
import { includes } from 'lodash/fp';
import { jsx } from '@emotion/core';

import { uniqueId } from '../../util/id';
import Selector from '../Selector';

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
   * The ref to the HTML Dom element
   */
  ref?: Ref<HTMLDivElement>;
}

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
      ...props
    }: SelectorGroupProps,
    ref: SelectorGroupProps['ref'],
  ) => {
    const name = customName || uniqueId('selector-group_');
    return (
      <div role="group" aria-label={label} ref={ref} {...props}>
        {options &&
          options.map(({ children, value, ...rest }) => (
            <Selector
              key={value}
              {...{ ...rest, value, name, onChange, multiple }}
              checked={includes(value, activeValue)}
            >
              {children}
            </Selector>
          ))}
      </div>
    );
  },
);

SelectorGroup.displayName = 'SelectorGroup';
