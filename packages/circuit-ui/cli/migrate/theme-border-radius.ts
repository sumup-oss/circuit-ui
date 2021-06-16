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

import { Collection, JSCodeshift, Transform } from 'jscodeshift';

import { findProperty } from './utils';

function renameFactory(
  j: JSCodeshift,
  root: Collection,
  prevValue: string,
  nextValue: string,
): void {
  findProperty(j, root, `theme.borderRadius.${prevValue}`).replaceWith(
    j.identifier(`theme.borderRadius.${nextValue}`),
  );
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  findProperty(j, root, `theme.borderRadius.kilo`).replaceWith(
    j.identifier(`'1px'`),
  );
  renameFactory(j, root, 'mega', 'bit');
  renameFactory(j, root, 'giga', 'byte');
  renameFactory(j, root, 'tera', 'byte');
  renameFactory(j, root, 'peta', 'kilo');

  return root.toSource();
};

export default transform;
