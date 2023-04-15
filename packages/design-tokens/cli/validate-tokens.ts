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
import { schema } from '../themes/schema';

/**
 * Validates that the theme includes all expected tokens
 * and that the token values match the expected type.
 */
export function validateTokens(tokens: Token[]): void {
  schema.forEach(({ name, type }) => {
    const token = tokens.find((t) => t.name === name);

    if (!token) {
      throw new Error(
        `The Figma export is missing the required "${name}" token.`,
      );
    }

    if (token.type !== type) {
      throw new Error(
        [
          `The "${name}" token does not match the expected type.`,
          `Expected "${type as string}". Received: "${token.type as string}."`,
        ].join(' '),
      );
    }
  });
}
