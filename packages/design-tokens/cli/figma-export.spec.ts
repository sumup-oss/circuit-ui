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

import { FigmaExport, transformFigmaExportToTokens } from './figma-export';

describe('transformFigmaExportToTokens', () => {
  const figmaExport = {
    color: {
      '◇ bg': {
        normal: {
          description: 'Use as normal background color in any given interface',
          type: 'color',
          value: '#00f2b840',
          blendMode: 'normal',
          extensions: {
            'org.lukasoppermann.figmaDesignTokens': {
              styleId: 'S:47d5da97c35ecb73d85a942074b4c6311cab95ca,',
              exportKey: 'color',
            },
          },
        },
      },
    },
  } as FigmaExport;

  it('should transform the Figma export to color tokens', () => {
    const actual = transformFigmaExportToTokens(figmaExport);

    const expected = [
      {
        name: '--cui-bg-normal',
        description: 'Use as normal background color in any given interface',
        value: '#00f2b840',
        type: 'color',
      },
    ];

    expect(actual).toEqual(expected);
  });
});
