/**
 * Copyright 2019, SumUp Ltd.
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

import { circuit as theme } from './src/themes';

export default {
  title: 'Circuit UI',
  description: "SumUp's React UI component library",
  ignore: [
    'readme.md',
    'changelog.md',
    'code_of_conduct.md',
    'contributing.md',
    'license.md',
    'publishing.md'
  ],
  dest: 'dist',
  public: 'docs/public',
  indexHtml: 'docs/index.html',
  wrapper: 'docs/utils/Wrapper',
  themeConfig: {
    colors: {
      primary: theme.colors.p500,
      link: theme.colors.p500,
      blue: theme.colors.b500,
      blueLight: theme.colors.b300,
      skyBlue: theme.colors.b300,
      background: theme.colors.white,
      gray: theme.colors.n500,
      grayDark: theme.colors.n700,
      grayExtraDark: theme.colors.n900,
      grayLight: theme.colors.n300,
      grayExtraLight: theme.colors.n100
    }
  },
  menu: [
    'Home',
    { name: 'Changelog', href: 'https://github.com/sumup/circuit-ui/releases' },
    'Component Status',
    'Getting Started',
    'Principles',
    'Components',
    'Styles'
  ]
};
