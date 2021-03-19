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

import { findLocalNames } from './utils';

function transformFactory(
  j: JSCodeshift,
  root: Collection,
  buttonName: string,
): void {
  const components = findLocalNames(j, root, buttonName);

  if (!components) {
    return;
  }

  components.forEach((component) => {
    const jsxElement = root.findJSXElements(component);
    // The babel and TypeScript parsers use different node types.
    ['Literal', 'StringLiteral'].forEach((type) => {
      jsxElement
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: 'size',
          },
          value: {
            type,
            value: 'giga',
          },
        })
        .replaceWith(() =>
          j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('mega')),
        );
    });
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
