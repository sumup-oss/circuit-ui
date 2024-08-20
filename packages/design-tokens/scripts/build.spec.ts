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

import type { FontFace, Token } from '../types/index.js';

import {
  validateTheme,
  createCSSCustomProperties,
  createStyles,
  createFontFaceDeclarations,
} from './build.js';

describe('build', () => {
  it('should throw not throw an error when tokens are  missing in a scoped theme', () => {
    const theme = {
      name: 'test',
      groups: [
        {
          colorScheme: 'light' as const,
          selectors: ['[data-color-scheme="light"]'],
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

    expect(actual).not.toThrow();
  });

  describe('validateTheme', () => {
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
        `":root {color-scheme: light;/* Use as normal background color in any given interface */ --cui-bg-normal: #00f2b840;}"`,
      );
    });

    it('should create CSS styles for the theme', () => {
      const actual = createStyles(theme);

      expect(actual).toMatchInlineSnapshot(
        `":root {color-scheme: light;/* Use as normal background color in any given interface */ --cui-bg-normal: #00f2b840;}"`,
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

  describe('createFontFaceDeclarations', () => {
    it('should create font face declarations for a custom font face', () => {
      const fontFaces = [
        {
          'font-family': 'Inter',
          'font-style': 'italic',
          'font-weight': '100 900',
          'font-display': 'swap',
          'src':
            'url("https://static.sumup.com/fonts/Inter/Inter-italic-cyrillic-ext.woff2") format("woff2")',
          'unicode-range':
            'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
        },
      ] as FontFace[];

      const actual = createFontFaceDeclarations(fontFaces);

      expect(actual).toMatchInlineSnapshot(
        `"@font-face { font-family: Inter;font-style: italic;font-weight: 100 900;font-display: swap;src: url("https://static.sumup.com/fonts/Inter/Inter-italic-cyrillic-ext.woff2") format("woff2");unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }"`,
      );
    });

    it('should create font face declarations for a fallback font face', () => {
      const fontFaces = [
        {
          'font-family': 'Inter-Fallback',
          'src': 'local("Arial")',
          'ascent-override': '90.49%',
          'descent-override': '22.56%',
          'line-gap-override': '0%',
          'size-adjust': '107.06%',
        },
      ] as FontFace[];

      const actual = createFontFaceDeclarations(fontFaces);

      expect(actual).toMatchInlineSnapshot(
        `"@font-face { font-family: Inter-Fallback;src: local("Arial");ascent-override: 90.49%;descent-override: 22.56%;line-gap-override: 0%;size-adjust: 107.06%; }"`,
      );
    });
  });
});
