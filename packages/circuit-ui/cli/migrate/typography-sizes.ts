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
            // These TypeScript errors popped up when bumping @types/jscodeshift
            // to 0.11.5. The codemod works.
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            value: {
              // @ts-ignore
              type,
              // @ts-ignore
              value: oldValue,
            },
            /* eslint-enable @typescript-eslint/ban-ts-comment */
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

function warnFactory(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
  componentName: string,
  propName: string,
): void {
  const components = findLocalNames(j, root, componentName);

  if (!components) {
    return;
  }

  components.forEach((component) => {
    const jsxElement = root.findJSXElements(component);
    ['Literal', 'StringLiteral'].forEach((type) => {
      jsxElement
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: 'size',
          },
          // These TypeScript errors popped up when bumping @types/jscodeshift
          // to 0.11.5. The codemod works.
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          value: {
            // @ts-ignore
            type,
            // @ts-ignore
            value: propName,
          },
          /* eslint-enable @typescript-eslint/ban-ts-comment */
        })
        .forEach((nodePath) => {
          const hasValue = Boolean(nodePath.value.value);
          if (hasValue) {
            console.error(
              [
                `Cannot migrate the ${componentName} "${propName}" size automatically,`,
                `please refer to the migration guide to migrate manually.\n in ${filePath}`,
              ].join(' '),
            );
          }
        });
    });
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const filePath = file.path;

  renameFactory(j, root, 'Headline', {
    exa: 'one',
    peta: 'one',
    tera: 'two',
    giga: 'three',
    mega: 'four',
    kilo: 'four',
  });
  renameFactory(j, root, 'Heading', {
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
    mega: 'one',
    kilo: 'two',
  });
  renameFactory(j, root, 'Text', {
    mega: 'one',
    kilo: 'two',
  });
  renameFactory(j, root, 'List', {
    mega: 'one',
    kilo: 'two',
  });
  renameFactory(j, root, 'Anchor', {
    mega: 'one',
    kilo: 'two',
  });

  warnFactory(j, root, filePath, 'Headline', 'zetta');
  warnFactory(j, root, filePath, 'Heading', 'zetta');
  warnFactory(j, root, filePath, 'Body', 'giga');
  warnFactory(j, root, filePath, 'Text', 'giga');
  warnFactory(j, root, filePath, 'List', 'giga');
  warnFactory(j, root, filePath, 'Anchor', 'giga');

  return root.toSource();
};

export default transform;
