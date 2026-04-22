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
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-latin-s.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+017E, U+018F, U+0192, U+019D, U+01C4-U+01CC, U+01E6-U+01E7, U+01EA-U+01EB, U+01F1-U+01F3, U+01FA-U+021B, U+022A-U+022D, U+0230-U+0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+0308, U+030A-U+030D, U+030F, U+0311-U+0313, U+0315, U+0320, U+0324-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+1DC6-U+1DC7, U+1E20-U+1E21, U+1E80-U+1E85, U+1E9E, U+1EBC-U+1EBD, U+1EF2-U+1EF3, U+1EF8-U+1EF9, U+2013-U+2014, U+2018-U+201F, U+2022, U+2026, U+2030, U+2039-U+203A, U+2044, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2248, U+2260, U+2264-U+2265, U+27F5-U+27F6, U+FB01-U+FB02',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-latin-l.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+017E, U+018F, U+0192, U+019D, U+01A0-U+01A1, U+01AF-U+01B0, U+01C4-U+01CC, U+01E6-U+01E7, U+01EA-U+01EB, U+01F1-U+01F3, U+01FA-U+021B, U+022A-U+022D, U+0230-U+0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+030D, U+030F, U+0311-U+0313, U+0315, U+031B, U+0320, U+0323-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+1DC6-U+1DC7, U+1E20-U+1E21, U+1E80-U+1E85, U+1E9E, U+1EA0-U+1EF9, U+2013-U+2014, U+2018-U+2022, U+2026, U+2030, U+2032-U+2033, U+2039-U+203A, U+2042, U+2044, U+2058-U+2059, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2215, U+2217, U+2219, U+2248, U+2260, U+2264-U+2265, U+2588, U+2591-U+2593, U+25A0-U+25A2, U+25AE-U+25AF, U+25B2-U+25B3, U+25B6-U+25B7, U+25BC-U+25BD, U+25C0-U+25C1, U+25C6-U+25C7, U+25CA-U+25CB, U+25CF-U+25D3, U+25D6-U+25D7, U+25E2-U+25E5, U+25E7-U+25EA, U+25EC-U+25EE, U+25F4-U+25F7, U+2600, U+2605-U+2606, U+2611-U+2612, U+2639-U+263B, U+2665, U+2714, U+2718, U+271A, U+272A, U+275B-U+275E, U+2770-U+2771, U+27F5-U+27F6, U+29BE-U+29BF, U+29D6-U+29D7, U+2B12-U+2B15, U+3008-U+3009, U+3010-U+3011, U+3016-U+3017, U+FB01-U+FB02',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-greek.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+00A9, U+00AB-U+00B9, U+00BB-U+00BF, U+00D7, U+00F7, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+0308, U+030A-U+030D, U+030F, U+0311-U+0313, U+0315, U+0320, U+0324-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+0374-U+0375, U+037E, U+0384-U+038A, U+038C, U+038E-U+03A1, U+03A3-U+03CE, U+1DC6-U+1DC7, U+2013-U+2014, U+2018-U+201F, U+2022, U+2026, U+2030, U+2039-U+203A, U+2044, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2248, U+2260, U+2264-U+2265, U+27F5-U+27F6, U+FB01-U+FB02',
  },
  {
    'font-family': 'SumUp Narrow',
    'font-style': 'normal',
    'font-weight': '300 700',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-narrow-cyrillic.woff2") format("woff2-variations")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+00A9, U+00AB-U+00B9, U+00BB-U+00BF, U+00D7, U+00F7, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+0308, U+030A-U+030D, U+030F, U+0311-U+0313, U+0315, U+0320, U+0324-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+0400-U+045F, U+0462-U+0463, U+0472-U+0475, U+0490-U+0493, U+0496-U+0497, U+049A-U+049B, U+04A2-U+04A3, U+04AE-U+04B3, U+04B6-U+04B7, U+04BA-U+04BB, U+04C0, U+04CF, U+04D8-U+04D9, U+04E2-U+04E3, U+04E8-U+04E9, U+04EE-U+04EF, U+1DC6-U+1DC7, U+2013-U+2014, U+2018-U+201F, U+2022, U+2026, U+2030, U+2039-U+203A, U+2044, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2248, U+2260, U+2264-U+2265, U+27F5-U+27F6, U+FB01-U+FB02',
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
      'url("https://static.sumup.com/fonts/sumup/sumup-black-latin-s.woff2") format("woff2")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+017E, U+018F, U+0192, U+019D, U+01C4-U+01CC, U+01E6-U+01E7, U+01EA-U+01EB, U+01F1-U+01F3, U+01FA-U+021B, U+022A-U+022D, U+0230-U+0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+0308, U+030A-U+030D, U+030F, U+0311-U+0313, U+0315, U+0320, U+0324-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+1DC6-U+1DC7, U+1E20-U+1E21, U+1E80-U+1E85, U+1E9E, U+1EBC-U+1EBD, U+1EF2-U+1EF3, U+1EF8-U+1EF9, U+2013-U+2014, U+2018-U+201F, U+2022, U+2026, U+2030, U+2039-U+203A, U+2044, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2248, U+2260, U+2264-U+2265, U+27F5-U+27F6, U+FB01-U+FB02',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-latin-l.woff2") format("woff2")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+017E, U+018F, U+0192, U+019D, U+01A0-U+01A1, U+01AF-U+01B0, U+01C4-U+01CC, U+01E6-U+01E7, U+01EA-U+01EB, U+01F1-U+01F3, U+01FA-U+021B, U+022A-U+022D, U+0230-U+0233, U+0237, U+0259, U+0272, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+030D, U+030F, U+0311-U+0313, U+0315, U+031B, U+0320, U+0323-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+1DC6-U+1DC7, U+1E20-U+1E21, U+1E80-U+1E85, U+1E9E, U+1EA0-U+1EF9, U+2013-U+2014, U+2018-U+2022, U+2026, U+2030, U+2032-U+2033, U+2039-U+203A, U+2042, U+2044, U+2058-U+2059, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2215, U+2217, U+2219, U+2248, U+2260, U+2264-U+2265, U+2588, U+2591-U+2593, U+25A0-U+25A2, U+25AE-U+25AF, U+25B2-U+25B3, U+25B6-U+25B7, U+25BC-U+25BD, U+25C0-U+25C1, U+25C6-U+25C7, U+25CA-U+25CB, U+25CF-U+25D3, U+25D6-U+25D7, U+25E2-U+25E5, U+25E7-U+25EA, U+25EC-U+25EE, U+25F4-U+25F7, U+2600, U+2605-U+2606, U+2611-U+2612, U+2639-U+263B, U+2665, U+2714, U+2718, U+271A, U+272A, U+275B-U+275E, U+2770-U+2771, U+27F5-U+27F6, U+29BE-U+29BF, U+29D6-U+29D7, U+2B12-U+2B15, U+3008-U+3009, U+3010-U+3011, U+3016-U+3017, U+FB01-U+FB02',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-greek.woff2") format("woff2")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+00A9, U+00AB-U+00B9, U+00BB-U+00BF, U+00D7, U+00F7, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+0308, U+030A-U+030D, U+030F, U+0311-U+0313, U+0315, U+0320, U+0324-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+0374-U+0375, U+037E, U+0384-U+038A, U+038C, U+038E-U+03A1, U+03A3-U+03CE, U+1DC6-U+1DC7, U+2013-U+2014, U+2018-U+201F, U+2022, U+2026, U+2030, U+2039-U+203A, U+2044, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2248, U+2260, U+2264-U+2265, U+27F5-U+27F6, U+FB01-U+FB02',
  },
  {
    'font-family': 'SumUp Black',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-display': 'swap',
    'src':
      'url("https://static.sumup.com/fonts/sumup/sumup-black-cyrillic.woff2") format("woff2")',
    'unicode-range':
      'U+0020-U+007E, U+00A0-U+00A9, U+00AB-U+00B9, U+00BB-U+00BF, U+00D7, U+00F7, U+02B9, U+02BB-U+02BC, U+02C6-U+02C7, U+02C9, U+02D8-U+02DD, U+0300-U+0304, U+0306-U+0308, U+030A-U+030D, U+030F, U+0311-U+0313, U+0315, U+0320, U+0324-U+0329, U+032D-U+0332, U+0335, U+035C-U+035D, U+0361, U+0400-U+045F, U+0462-U+0463, U+0472-U+0475, U+0490-U+0493, U+0496-U+0497, U+049A-U+049B, U+04A2-U+04A3, U+04AE-U+04B3, U+04B6-U+04B7, U+04BA-U+04BB, U+04C0, U+04CF, U+04D8-U+04D9, U+04E2-U+04E3, U+04E8-U+04E9, U+04EE-U+04EF, U+1DC6-U+1DC7, U+2013-U+2014, U+2018-U+201F, U+2022, U+2026, U+2030, U+2039-U+203A, U+2044, U+2070, U+2074-U+2079, U+2080-U+2089, U+20A1, U+20A3-U+20A4, U+20A6-U+20A7, U+20A9, U+20AB-U+20AD, U+20B1-U+20B2, U+20B5, U+20B9-U+20BA, U+20BC-U+20BD, U+2116-U+2117, U+2122, U+212E, U+2153-U+2154, U+215B-U+215E, U+2190-U+2199, U+21A4, U+21A6, U+21A9-U+21AA, U+2212, U+2248, U+2260, U+2264-U+2265, U+27F5-U+27F6, U+FB01-U+FB02',
  },
] satisfies FontFace[];
