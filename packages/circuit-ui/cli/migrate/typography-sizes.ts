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

function renameFactory(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
  valueMap: { [key: string]: string },
): void {
  const components = findLocalNames(j, root, componentName);

  if (!components) {
    return;
  }

  Object.entries(valueMap).forEach(([oldValue, newValue]) => {
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
              value: oldValue,
            },
          })
          .replaceWith(() =>
            j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral(newValue)),
          );
      });
    });
  });
}

function removeFactory(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
): void {
  const components = findLocalNames(j, root, componentName);

  if (!components) {
    return;
  }

  components.forEach((component) => {
    const jsxElement = root.findJSXElements(component);
    jsxElement
      .find(j.JSXAttribute, {
        name: {
          type: 'JSXIdentifier',
          name: 'size',
        },
      })
      .remove();
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  renameFactory(j, root, 'Headline', {
    zetta: 'one',
    exa: 'one',
    peta: 'one',
    tera: 'two',
    giga: 'three',
    mega: 'four',
    kilo: 'four',
  });
  renameFactory(j, root, 'Heading', {
    zetta: 'one',
    exa: 'one',
    peta: 'one',
    tera: 'two',
    giga: 'three',
    mega: 'four',
    kilo: 'four',
  });

  removeFactory(j, root, 'SubHeadline');
  removeFactory(j, root, 'SubHeading');

  renameFactory(j, root, 'Body', {
    giga: 'one',
    mega: 'one',
    kilo: 'two',
  });
  renameFactory(j, root, 'Text', {
    giga: 'one',
    mega: 'one',
    kilo: 'two',
  });
  renameFactory(j, root, 'List', {
    giga: 'one',
    mega: 'one',
    kilo: 'two',
  });
  renameFactory(j, root, 'Anchor', {
    giga: 'one',
    mega: 'one',
    kilo: 'two',
  });

  return root.toSource();
};

export default transform;
