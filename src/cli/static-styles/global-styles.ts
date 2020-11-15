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

import Stylis from '@emotion/stylis';
import { Theme } from '@sumup/design-tokens';

import { BaseStyles } from '../..';

import { render } from './render';
import { InsertFactory } from './types';

const stylis = new Stylis();

export function globalStyles(theme: Theme) {
  let styleSheet = '';

  const insertFactory: InsertFactory = () => (_, serialized) => {
    const rules = serialized.styles;
    styleSheet = stylis('', rules);
  };

  const renderFn = render(theme, insertFactory);

  renderFn(BaseStyles);

  return styleSheet;
}
