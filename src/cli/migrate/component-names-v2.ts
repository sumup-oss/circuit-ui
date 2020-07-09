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

import { findImportsByPath } from './utils';

function transformFactory(
  j: JSCodeshift,
  root: Collection,
  componentNames: string[],
): void {
  const [oldComponentName, newComponentName] = componentNames;
  const imports = findImportsByPath(j, root, '@sumup/circuit-ui');

  const componentImport = imports.find(i => i.name === oldComponentName);

  if (!componentImport) {
    return;
  }

  root
    .find(j.Identifier)
    .filter(nodePath => nodePath.node.name === oldComponentName)
    .replaceWith(j.identifier(newComponentName));
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  [
    ['ListView', 'CardList'],
    ['SvgButton', 'IconButton'],
    ['Message', 'Notification'],
    ['InlineNotification', 'InlineMessage'],
    ['GlobalStyles', 'BaseStyles'],
  ].forEach(componentNames => {
    transformFactory(j, root, componentNames);
  });

  return root.toSource();
};

export default transform;
