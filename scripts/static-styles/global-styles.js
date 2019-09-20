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

import createCache from '@emotion/cache';
import Stylis from '@emotion/stylis';

import BaseStyles from '../../src/components/BaseStyles';

import render from './render';

const cache = createCache();
const stylis = new Stylis();

export default function main({ theme } = {}) {
  let styleSheet = '';

  const insert = (...args) => {
    const rules = args[1].styles;
    styleSheet = stylis('', rules);
  };

  const renderFn = render({ cache: { ...cache, insert }, theme });

  renderFn(BaseStyles);

  return styleSheet;
}
