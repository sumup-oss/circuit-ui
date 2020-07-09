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

import { Transform, JSCodeshift, Collection } from 'jscodeshift';

import { renameJSXAttribute, findLocalNames } from './utils';

function transformFactory(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
): void {
  const components = findLocalNames(j, root, componentName);

  if (!components) {
    return;
  }

  components.forEach(component => {
    renameJSXAttribute(j, root, component, 'onToggle', 'onChange');
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  transformFactory(j, root, 'RadioButton');
  transformFactory(j, root, 'Switch');

  return root.toSource();
};

export default transform;
