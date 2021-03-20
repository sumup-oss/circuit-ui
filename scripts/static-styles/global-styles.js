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

import { BaseStyles } from '../../packages/circuit-ui/index.ts';

import render from './render';

const stylis = new Stylis();

export default function globalStyles({ theme } = {}) {
  let styleSheet = '';

  const insertFactory = () => (...args) => {
    const rules = args[1].styles;
    styleSheet = stylis('', rules);
  };

  const renderFn = render(theme, insertFactory);

  renderFn(BaseStyles);

  return styleSheet;
}
