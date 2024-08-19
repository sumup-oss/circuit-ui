/**
 * Copyright 2024, SumUp Ltd.
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

import type { FontFace, Token } from '../types/index.js';

export const fontTokens = [
  /* Font families */
  {
    name: '--cui-font-stack-default',
    value:
      '"Inter", "Inter-Fallback", Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    type: 'fontFamily',
  },
  {
    name: '--cui-font-stack-mono',
    value:
      'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
    type: 'fontFamily',
  },
  /* Font weights */
  {
    name: '--cui-font-weight-regular',
    value: '400',
    type: 'fontWeight',
  },
  {
    name: '--cui-font-weight-bold',
    value: '700',
    type: 'fontWeight',
  },
] satisfies Token[];

export const inter = [
  /* cyrillic-ext */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-cyrillic-ext.woff2") format("woff2")',
    'unicode-range':
      'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  },
  /* cyrillic */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-cyrillic.woff2") format("woff2")',
    'unicode-range': 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116',
  },
  /* greek-ext */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-greek-ext.woff2") format("woff2")',
    'unicode-range': 'U+1F00-1FFF',
  },
  /* greek */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-greek.woff2") format("woff2")',
    'unicode-range':
      'U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF',
  },
  /* vietnamese */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-vietnamese.woff2") format("woff2")',
    'unicode-range':
      'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB',
  },
  /* latin-ext */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-latin-ext.woff2") format("woff2")',
    'unicode-range':
      'U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  },
  /* latin */
  {
    'font-family': 'Inter',
    'font-style': 'italic',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-italic-latin.woff2") format("woff2")',
    'unicode-range':
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  },
  /* cyrillic-ext */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-cyrillic-ext.woff2") format("woff2")',
    'unicode-range':
      'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  },
  /* cyrillic */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-cyrillic.woff2") format("woff2")',
    'unicode-range': 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116',
  },
  /* greek-ext */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-greek-ext.woff2") format("woff2")',
    'unicode-range': 'U+1F00-1FFF',
  },
  /* greek */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-greek.woff2") format("woff2")',
    'unicode-range':
      'U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF',
  },
  /* vietnamese */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-vietnamese.woff2") format("woff2")',
    'unicode-range':
      'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB',
  },
  /* latin-ext */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-latin-ext.woff2") format("woff2")',
    'unicode-range':
      'U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  },
  /* latin */
  {
    'font-family': 'Inter',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/Inter-normal-latin.woff2") format("woff2")',
    'unicode-range':
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  },
  /* fallback */
  {
    'font-family': 'Inter-Fallback',
    'src': 'local("Arial")',
    'ascent-override': '90.49%',
    'descent-override': '22.56%',
    'line-gap-override': '0%',
    'size-adjust': '107.06%',
  },
] satisfies FontFace[];
