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

import { describe, it, expect } from 'vitest';

import type { Token } from '../types/index.js';

import { validateTokens, createCSSCustomProperties } from './build.js';

describe('build', () => {
  describe('validateTokens', () => {
    it('should throw an error when required tokens are missing', () => {
      const tokens = [
        {
          name: '--cui-bg-normal',
          description: 'Use as normal background color in any given interface',
          value: '#00f2b840',
          type: 'color',
        },
      ] as Token[];

      const actual = () => validateTokens(tokens);

      expect(actual).toThrow(
        'The theme is missing the required "--cui-bg-normal-hovered" token.',
      );
    });

    it('should throw an error when a token does not match the expected type', () => {
      const tokens = [
        {
          name: '--cui-bg-normal',
          description: 'Use as normal background color in any given interface',
          value: '#00f2b840',
          type: 'spacing',
        },
      ] as unknown as Token[];

      const actual = () => validateTokens(tokens);

      expect(actual).toThrow(
        'The "--cui-bg-normal" token does not match the expected type. Expected "color". Received "spacing."',
      );
    });
  });

  describe('createCSSCustomProperties', () => {
    const tokens = [
      {
        name: '--cui-bg-normal',
        description: 'Use as normal background color in any given interface',
        value: '#00f2b840',
        type: 'color',
      },
    ] as Token[];

    it('should create CSS custom properties from the color tokens', () => {
      const actual = createCSSCustomProperties(tokens);

      expect(actual).toMatchInlineSnapshot(
        '":root, ::selection, ::backdrop { /* Use as normal background color in any given interface */ --cui-bg-normal: #00f2b840; }"',
      );
    });
  });
});
