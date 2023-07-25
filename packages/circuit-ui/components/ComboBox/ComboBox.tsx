/**
 * Copyright 2023, SumUp Ltd.
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

import { ComponentType, forwardRef } from 'react';

import { InputElement, InputProps } from '../Input';
import { uniqueId } from '../../util/id';

type Option = { value: string };

export type ComboBoxProps<Props extends InputProps = InputProps> = Props & {
  component: ComponentType<Props>;
  options: Option[];
};

export const ComboBox = forwardRef<InputElement, ComboBoxProps>(
  ({ component: Input, options, ...props }) => {
    const datalistId = uniqueId('datalist_');
    return (
      <>
        <Input {...props} list={datalistId} />
        <datalist id={datalistId}>
          {options.map((option) => (
            <option key={option.value} value={option.value} />
          ))}
        </datalist>
      </>
    );
  },
) as <Props extends InputProps>(props: ComboBoxProps<Props>) => JSX.Element;
