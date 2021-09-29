/**
 * Copyright 2020, SumUp Ltd.
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

import { Transform } from 'jscodeshift';

import { findProperty } from './utils';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const mappings = [
    ['theme.borderRadius.mega', 'theme.borderRadius.bit'],
    ['theme.borderRadius.giga', 'theme.borderRadius.byte'],
    ['theme.borderRadius.tera', 'theme.borderRadius.byte'],
    ['theme.borderRadius.peta', 'theme.borderRadius.kilo'],
    ['theme.borderRadius.kilo', "'1px'"],
    ['p.theme.borderRadius.mega', 'p.theme.borderRadius.bit'],
    ['p.theme.borderRadius.giga', 'p.theme.borderRadius.byte'],
    ['p.theme.borderRadius.tera', 'p.theme.borderRadius.byte'],
    ['p.theme.borderRadius.peta', 'p.theme.borderRadius.kilo'],
    ['p.theme.borderRadius.kilo', "'1px'"],
  ];

  mappings.forEach(([prevValue, nextValue]) =>
    findProperty(j, root, prevValue).replaceWith(j.identifier(nextValue)),
  );

  return root.toSource();
};

export default transform;
