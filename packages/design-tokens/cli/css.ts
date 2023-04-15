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

import type { Token } from '../types';

/**
 * Generates the root CSS custom properties from the tokens
 */
export function createCSSCustomProperties(tokens: Token[]): string {
  const customProperties = tokens
    .flatMap((token) => {
      const { description, name, value } = token;
      const lines = [];

      if (description) {
        lines.push(`/* ${description} */`);
      }

      lines.push(`${name}: ${value};`);

      return lines;
    })
    .join('\n');
  return `:root {\n${customProperties}\n}`;
}
