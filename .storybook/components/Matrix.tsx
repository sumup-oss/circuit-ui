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

export type MatrixLayout = 'single' | 'paired';

interface MatrixProps<Props> {
  component: ComponentType<Props>;
  args: Props;
  horizontal: { prop: keyof Props; values: string[] | readonly string[] };
  vertical: { prop: keyof Props; values: string[] | readonly string[] };
  /**
   * `single` (default): full combination grid, allows horizontal value & every vertical value.
   * `paired`: one column per index; `horizontal.values[i]` with `vertical.values[i]`.
   * Paired mode requires both arrays to have the same length.
   */
  layout?: MatrixLayout;
  /**
   * Set to `false` when the vertical prop is already visible on the component
   * (eg `label` on form fields) to avoid duplicating it in the table.
   * Ignored when `layout` is `paired` (no row header column).
   */
  showRowHeaders?: boolean;
}

export function Matrix<Props>({
  component: Component,
  args,
  horizontal,
  vertical,
  layout = 'single',
  showRowHeaders = true,
}: MatrixProps<Props>) {
  if (layout === 'paired') {
    if (horizontal.values.length !== vertical.values.length) {
      throw new Error(
        'Matrix: paired layout requires horizontal.values and vertical.values to have the same length.',
      );
    }

    return (
      <table>
        <thead>
          <tr>
            {horizontal.values.map((horizontalValue) => (
              <th
                key={String(horizontalValue)}
                scope="col"
                className={classes.cell}
              >
                <Compact color="subtle">{horizontalValue}</Compact>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {horizontal.values.map((horizontalValue, index) => (
              <td
                key={`${String(horizontalValue)}-${String(vertical.values[index])}`}
                className={classes.cell}
              >
                <Component
                  {...args}
                  {...{
                    [horizontal.prop]: horizontalValue,
                    [vertical.prop]: vertical.values[index],
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          {showRowHeaders ? <th /> : null}
          {horizontal.values.map((horizontalValue) => (
            <th
              key={String(horizontalValue)}
              scope="col"
              className={classes.cell}
            >
              <Compact color="subtle">{horizontalValue}</Compact>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {vertical.values.map((verticalValue) => (
          <tr key={String(verticalValue)}>
            {showRowHeaders ? (
              <th scope="row" className={classes.cell}>
                <Compact color="subtle">{verticalValue}</Compact>
              </th>
            ) : null}
            {horizontal.values.map((horizontalValue) => (
              <td
                key={`${String(verticalValue)}-${String(horizontalValue)}`}
                className={classes.cell}
              >
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
