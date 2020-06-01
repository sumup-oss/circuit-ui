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

import { findImportsByPath, findStyledComponentNames } from './utils';

function transformFactory(
  j: JSCodeshift,
  root: Collection,
  buttonName: string
): void {
  const imports = findImportsByPath(j, root, '@sumup/circuit-ui');

  const buttonImport = imports.find(i => i.name === buttonName);

  if (!buttonImport) {
    return;
  }

  const localName = buttonImport.local;

  const styledButtons = findStyledComponentNames(j, root, localName);

  const components = [localName, ...styledButtons];

  components.forEach(component => {
    // Change variants from boolean to enum prop
    ['primary', 'secondary'].forEach(variant => {
      root
        .findJSXElements(component)
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: variant
          }
        })
        .replaceWith(() =>
          j.jsxAttribute(j.jsxIdentifier('variant'), j.stringLiteral(variant))
        );
    });

    // Remove flat variant
    root
      .findJSXElements(component)
      .find(j.JSXAttribute, {
        name: {
          type: 'JSXIdentifier',
          name: 'flat'
        }
      })
      .remove();

    // TODO: Replace plain variant with Anchor component
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  transformFactory(j, root, 'Button');
  transformFactory(j, root, 'LoadingButton');

  return root.toSource();
};

export default transform;
