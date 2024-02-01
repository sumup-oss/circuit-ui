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

import {
  validateTheme,
  createCSSCustomProperties,
  createStyles,
} from './build.js';

describe('build', () => {
  it('should throw an error no tokens are globally defined', () => {
    const theme = {
      name: 'test',
      groups: [
        {
          colorScheme: 'light' as const,
          selectors: ['body'],
          tokens: [
            {
              name: '--cui-bg-normal',
              description:
                'Use as normal background color in any given interface',
              value: '#00f2b840',
              type: 'color',
            },
          ] as Token[],
        },
      ],
    };

    const actual = () => validateTheme(theme);

    expect(actual).toThrow(
      'The "test" theme does not define any global tokens. Add them to the ":root" selector.',
    );
  });

  describe('validateTheme', () => {
    it('should throw an error when required tokens are not globally defined', () => {
      const theme = {
        name: 'test',
        groups: [
          {
            colorScheme: 'light' as const,
            selectors: [':root'],
            tokens: [
              {
                name: '--cui-bg-normal',
                description:
                  'Use as normal background color in any given interface',
                value: '#00f2b840',
                type: 'color',
              },
            ] as Token[],
          },
        ],
      };

      const actual = () => validateTheme(theme);

      expect(actual).toThrow(
        'The "test" theme does not globally define the required "--cui-bg-normal-hovered" token. Add it to the ":root" selector.',
      );
    });

    it('should throw an error when a token does not match the expected type', () => {
      const theme = {
        name: 'test',
        groups: [
          {
            colorScheme: 'light' as const,
            selectors: [':root'],
            tokens: [
              {
                name: '--cui-bg-normal',
                description:
                  'Use as normal background color in any given interface',
                value: '#00f2b840',
                type: 'spacing',
              },
            ] as unknown as Token[],
          },
        ],
      };

      const actual = () => validateTheme(theme);

      expect(actual).toThrow(
        'The "--cui-bg-normal" token does not match the expected type. Expected "color". Received "spacing."',
      );
    });
  });

  describe('createStyles', () => {
    const theme = {
      tokens: [
        {
          name: '--cui-bg-normal',
          description: 'Use as normal background color in any given interface',
          value: '#00f2b840',
          type: 'color',
        },
      ] as Token[],
      selectors: [':root'],
      colorScheme: 'light' as const,
    };

    it('should create CSS styles for the theme', () => {
      const actual = createStyles(theme);

      expect(actual).toMatchInlineSnapshot(
        `
        ":root {
            color-scheme: light;
            /* Use as normal background color in any given interface */ --cui-bg-normal: #00f2b840;
          }"
      `,
      );
    });

    it('should create CSS styles for the theme', () => {
      const actual = createStyles(theme);

      expect(actual).toMatchInlineSnapshot(
        `
        ":root {
            color-scheme: light;
            /* Use as normal background color in any given interface */ --cui-bg-normal: #00f2b840;
          }"
      `,
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
        '"/* Use as normal background color in any given interface */ --cui-bg-normal: #00f2b840;"',
      );
    });
  });
});
