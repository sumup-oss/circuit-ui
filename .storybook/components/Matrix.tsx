/**
 * Copyright 2026, SumUp Ltd.
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

import type { ComponentType } from 'react';

import classes from './Matrix.module.css';
import { Compact } from '../../packages/circuit-ui/components/Compact/Compact.js';

type AxisValue<Props> = string | { value: string; args?: Partial<Props> };

function resolveAxisValue<Props>(entry: AxisValue<Props>): {
  value: string;
  args: Partial<Props>;
} {
  if (typeof entry === 'string') {
    return { value: entry, args: {} };
  }
  return { value: entry.value, args: entry.args ?? {} };
}

interface MatrixProps<Props> {
  component: ComponentType<Props>;
  args: Props;
  horizontal: {
    prop: keyof Props;
    values: AxisValue<Props>[] | readonly AxisValue<Props>[];
  };
  vertical: {
    prop: keyof Props;
    values: AxisValue<Props>[] | readonly AxisValue<Props>[];
  };
}

export function Matrix<Props>({
  component: Component,
  args,
  horizontal,
  vertical,
}: MatrixProps<Props>) {
  const horizontalEntries = horizontal.values.map(resolveAxisValue<Props>);
  const verticalEntries = vertical.values.map(resolveAxisValue<Props>);

  return (
    <table>
      <thead>
        <tr>
          <th />
          {horizontalEntries.map(({ value }) => (
            <th key={value} scope="col" className={classes.cell}>
              <Compact color="subtle">{value}</Compact>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {verticalEntries.map(({ value: verticalValue, args: verticalArgs }) => (
          <tr key={verticalValue}>
            <th scope="row" className={classes.cell}>
              <Compact color="subtle">{verticalValue}</Compact>
            </th>
            {horizontalEntries.map(
              ({ value: horizontalValue, args: horizontalArgs }) => (
                <td key={horizontalValue} className={classes.cell}>
                  <Component
                    {...args}
                    {...horizontalArgs}
                    {...verticalArgs}
                    {...{
                      [horizontal.prop]: horizontalValue,
                      [vertical.prop]: verticalValue,
                    }}
                  />
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
