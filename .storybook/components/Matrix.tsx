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

import type { ComponentType } from 'react';

import classes from './Matrix.module.css';
import { Compact } from '../../packages/circuit-ui/components/Compact/Compact.js';

interface MatrixProps<Props> {
  component: ComponentType<Props>;
  args: Props;
  horizontal: { prop: keyof Props; values: string[] | readonly string[] };
  vertical: { prop: keyof Props; values: string[] | readonly string[] };
}

export function Matrix<Props>({
  component: Component,
  args,
  horizontal,
  vertical,
}: MatrixProps<Props>) {
  return (
    <table>
      <thead>
        <tr>
          <th />
          {horizontal.values.map((horizontalValue) => (
            <th key={horizontalValue} scope="col" className={classes.cell}>
              <Compact color="subtle">{horizontalValue}</Compact>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {vertical.values.map((verticalValue) => (
          <tr key={verticalValue}>
            <th scope="row" className={classes.cell}>
              <Compact color="subtle">{verticalValue}</Compact>
            </th>
            {horizontal.values.map((horizontalValue) => (
              <td key={horizontalValue} className={classes.cell}>
                <Component
                  {...args}
                  {...{
                    [horizontal.prop]: horizontalValue,
                    [vertical.prop]: verticalValue,
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
