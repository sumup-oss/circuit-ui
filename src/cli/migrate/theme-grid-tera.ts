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

import { findProperty, findLocalNames } from './utils';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  findProperty(j, root, 'theme.grid.afterTera').replaceWith(
    j.identifier('theme.grid.tera'),
  );

  const components = findLocalNames(j, root, 'Col');
  const props = ['span', 'skip'];

  if (components) {
    components.forEach((component) => {
      props.forEach((prop) => {
        [j.Property, j.ObjectProperty].forEach((property) => {
          root
            .findJSXElements(component)
            .find(j.JSXAttribute, {
              name: {
                type: 'JSXIdentifier',
                name: prop,
              },
            })
            .find(property as any, {
              key: {
                type: 'Identifier',
                name: 'afterTera',
              },
            })
            .replaceWith((nodePath) =>
              j.objectProperty(
                j.identifier('tera'),
                (nodePath.node as any).value,
              ),
            );
        });
      });
    });
  }

  return root.toSource({ trailingComma: true });
};

export default transform;
