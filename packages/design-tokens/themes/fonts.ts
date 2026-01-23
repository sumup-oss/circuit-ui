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
    'font-family': 'NaN Holo Narrow',
    'font-style': 'normal',
    'font-weight': '300 900',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/holo/nan-holo-for-testing-only.woff2") format("woff2-variations")',
    'font-variation-settings': '"wdth" 95, "mono" 0 ',
  },
  {
    'font-family': 'NaN Holo Black',
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-display': 'swap',
    'font-variation-settings': '"wdth" 100, "wght" 900',
    'src':
      'url("https://static.sumup.com/fonts/holo/nan-holo-for-testing-only.woff2") format("woff2-variations")',
  },
] satisfies FontFace[];
