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

import type { Color, Token } from '../types';

export type FigmaExport = {
  color: {
    [key: string]: {
      [key: string]: {
        // Currently, only colors are supported
        type: 'color';
        value: Color;
        description: string;
      };
    };
  };
};

/**
 * Transforms the deeply nested Figma export into the simpler token format
 */
export function transformFigmaExportToTokens(
  figmaExport: FigmaExport,
): Token[] {
  return Object.entries(figmaExport.color).flatMap(([key, values]) => {
    // The "usage" is prefixed with a symbol in Figma
    const usage = key.split(' ')[1];

    return Object.entries(values).flatMap(([name, token]) => ({
      name: `--cui-${usage}-${name.replace(/\./g, '-')}`,
      description: token.description,
      value: token.value,
      type: token.type,
    }));
  });
}
