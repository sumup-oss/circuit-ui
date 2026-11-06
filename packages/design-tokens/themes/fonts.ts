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

// IMPORTANT: The order of the font face declarations matters!
// They must be ordered from most specific to least specific, otherwise,
// browsers will download too many files and Chrome will display characters
// with diacritics incorrectly.
export const sumup = [
  // Narrow
  {
    'font-family': 'SumUp Narrow fallback',
    'font-style': 'normal',
    'font-weight': '375',
    'src': 'local("Arial")',
    'size-adjust': '95%',
    'ascent-override': '101.1%',
    'descent-override': '26.6%',
    'line-gap-override': '0%',
  },
  {
    'font-family': 'SumUp Narrow fallback',
    'font-style': 'normal',
    'font-weight': '550',
    'src': 'local("Arial")',
    'size-adjust': '97.5%',
    'ascent-override': '101.1%',
    'descent-override': '26.6%',
    'line-gap-override': '0%',
  },
  {
    'font-family': 'SumUp Narrow fallback',
    'font-style': 'normal',
    'font-weight': '650',
    'src': 'local("Arial Bold"), local("Arial")',
    'size-adjust': '90%',
    'ascent-override': '101%',
    'descent-override': '26.6%',
    'line-gap-override': '0%',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-cyrillic.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-007E, U+00A0-00A9, U+00AB-00B9, U+00BB-00BF, U+00D7, U+00F7, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030D, U+030F, U+0311-0313, U+0315, U+0320, U+0324-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+0400-045F, U+0462-0463, U+0472-0475, U+0490-0493, U+0496-0497, U+049A-049B, U+04A2-04A3, U+04AE-04B3, U+04B6-04B7, U+04BA-04BB, U+04C0, U+04CF, U+04D8-04D9, U+04E2-04E3, U+04E8-04E9, U+04EE-04EF, U+1DC6-1DC7, U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2248, U+2260, U+2264-2265, U+27F5-27F6, U+FB01-FB02',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-greek.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-007E, U+00A0-00A9, U+00AB-00B9, U+00BB-00BF, U+00D7, U+00F7, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030D, U+030F, U+0311-0313, U+0315, U+0320, U+0324-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+0374-0375, U+037E, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03CE, U+1DC6-1DC7, U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2248, U+2260, U+2264-2265, U+27F5-27F6, U+FB01-FB02',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-latin-l.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-007E, U+00A0-017E, U+018F, U+0192, U+019D, U+01A0-01A1, U+01AF-01B0, U+01C4-01CC, U+01E6-01E7, U+01EA-01EB, U+01F1-01F3, U+01FA-021B, U+022A-022D, U+0230-0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-030D, U+030F, U+0311-0313, U+0315, U+031B, U+0320, U+0323-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+1DC6-1DC7, U+1E20-1E21, U+1E80-1E85, U+1E9E, U+1EA0-1EF9, U+2013-2014, U+2018-2022, U+2026, U+2030, U+2032-2033, U+2039-203A, U+2042, U+2044, U+2058-2059, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2215, U+2217, U+2219, U+2248, U+2260, U+2264-2265, U+2588, U+2591-2593, U+25A0-25A2, U+25AE-25AF, U+25B2-25B3, U+25B6-25B7, U+25BC-25BD, U+25C0-25C1, U+25C6-25C7, U+25CA-25CB, U+25CF-25D3, U+25D6-25D7, U+25E2-25E5, U+25E7-25EA, U+25EC-25EE, U+25F4-25F7, U+2600, U+2605-2606, U+2611-2612, U+2639-263B, U+2665, U+2714, U+2718, U+271A, U+272A, U+275B-275E, U+2770-2771, U+27F5-27F6, U+29BE-29BF, U+29D6-29D7, U+2B12-2B15, U+3008-3009, U+3010-3011, U+3016-3017, U+FB01-FB02',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-latin-s.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-007E, U+00A0-017E, U+018F, U+0192, U+019D, U+01C4-01CC, U+01E6-01E7, U+01EA-01EB, U+01F1-01F3, U+01FA-021B, U+022A-022D, U+0230-0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030D, U+030F, U+0311-0313, U+0315, U+0320, U+0324-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+1DC6-1DC7, U+1E20-1E21, U+1E80-1E85, U+1E9E, U+1EBC-1EBD, U+1EF2-1EF3, U+1EF8-1EF9, U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2248, U+2260, U+2264-2265, U+27F5-27F6, U+FB01-FB02',
  },
  // Black
  {
    'font-family': 'SumUp Black fallback',
    'font-style': 'normal',
    'font-weight': 'bold',
    'src': 'local("Arial Black"), local("Arial Bold"), local("Arial")',
    'size-adjust': '90.1%',
    'ascent-override': '102%',
    'descent-override': '28%',
    'line-gap-override': '0%',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-cyrillic.woff2") format("woff2")',
    'unicode-range':
      'U+0020-007E, U+00A0-00A9, U+00AB-00B9, U+00BB-00BF, U+00D7, U+00F7, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030D, U+030F, U+0311-0313, U+0315, U+0320, U+0324-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+0400-045F, U+0462-0463, U+0472-0475, U+0490-0493, U+0496-0497, U+049A-049B, U+04A2-04A3, U+04AE-04B3, U+04B6-04B7, U+04BA-04BB, U+04C0, U+04CF, U+04D8-04D9, U+04E2-04E3, U+04E8-04E9, U+04EE-04EF, U+1DC6-1DC7, U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2248, U+2260, U+2264-2265, U+27F5-27F6, U+FB01-FB02',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-greek.woff2") format("woff2")',
    'unicode-range':
      'U+0020-007E, U+00A0-00A9, U+00AB-00B9, U+00BB-00BF, U+00D7, U+00F7, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030D, U+030F, U+0311-0313, U+0315, U+0320, U+0324-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+0374-0375, U+037E, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03CE, U+1DC6-1DC7, U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2248, U+2260, U+2264-2265, U+27F5-27F6, U+FB01-FB02',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-latin-l.woff2") format("woff2")',
    'unicode-range':
      'U+0020-007E, U+00A0-017E, U+018F, U+0192, U+019D, U+01A0-01A1, U+01AF-01B0, U+01C4-01CC, U+01E6-01E7, U+01EA-01EB, U+01F1-01F3, U+01FA-021B, U+022A-022D, U+0230-0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-030D, U+030F, U+0311-0313, U+0315, U+031B, U+0320, U+0323-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+1DC6-1DC7, U+1E20-1E21, U+1E80-1E85, U+1E9E, U+1EA0-1EF9, U+2013-2014, U+2018-2022, U+2026, U+2030, U+2032-2033, U+2039-203A, U+2042, U+2044, U+2058-2059, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2215, U+2217, U+2219, U+2248, U+2260, U+2264-2265, U+2588, U+2591-2593, U+25A0-25A2, U+25AE-25AF, U+25B2-25B3, U+25B6-25B7, U+25BC-25BD, U+25C0-25C1, U+25C6-25C7, U+25CA-25CB, U+25CF-25D3, U+25D6-25D7, U+25E2-25E5, U+25E7-25EA, U+25EC-25EE, U+25F4-25F7, U+2600, U+2605-2606, U+2611-2612, U+2639-263B, U+2665, U+2714, U+2718, U+271A, U+272A, U+275B-275E, U+2770-2771, U+27F5-27F6, U+29BE-29BF, U+29D6-29D7, U+2B12-2B15, U+3008-3009, U+3010-3011, U+3016-3017, U+FB01-FB02',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-latin-s.woff2") format("woff2")',
    'unicode-range':
      'U+0020-007E, U+00A0-017E, U+018F, U+0192, U+019D, U+01C4-01CC, U+01E6-01E7, U+01EA-01EB, U+01F1-01F3, U+01FA-021B, U+022A-022D, U+0230-0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-02BC, U+02C6-02C7, U+02C9, U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030D, U+030F, U+0311-0313, U+0315, U+0320, U+0324-0329, U+032D-0332, U+0335, U+035C-035D, U+0361, U+1DC6-1DC7, U+1E20-1E21, U+1E80-1E85, U+1E9E, U+1EBC-1EBD, U+1EF2-1EF3, U+1EF8-1EF9, U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+2070, U+2074-2079, U+2080-2089, U+20A1, U+20A3-20A4, U+20A6-20A7, U+20A9, U+20AB-20AD, U+20B1-20B2, U+20B5, U+20B9-20BA, U+20BC-20BD, U+2116-2117, U+2122, U+212E, U+2153-2154, U+215B-215E, U+2190-2199, U+21A4, U+21A6, U+21A9-21AA, U+2212, U+2248, U+2260, U+2264-2265, U+27F5-27F6, U+FB01-FB02',
  },
] satisfies FontFace[];
