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

import type { FontFace } from '../types/index.js';

export const holo = [
  {
    'font-family': 'Holo',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src': 'url(./assets/fonts/NaNHoloNarrow-Regular.ttf) format("ttf")',
    'unicode-range':
      'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  },
  {
    'font-family': 'HoloBlack',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src': 'url(./assets/fonts/Holo-Black.ttf) format("ttf")',
    'unicode-range':
      'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  },
  {
    'font-family': 'HoloBold',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src': 'url(./assets/fonts/NaNHoloNarrow-Bold.ttf) format("ttf")',
    'unicode-range':
      'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  },
  {
    'font-family': 'HoloSemiBold',
    'font-style': 'normal',
    'font-weight': '100 900',
    'font-display': 'swap',
    'src': 'url(./assets/fonts/NaNHoloCondensed-SemiBold.ttf) format("ttf")',
    'unicode-range':
      'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  },
] satisfies FontFace[];
