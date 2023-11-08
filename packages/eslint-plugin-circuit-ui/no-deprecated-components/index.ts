/**
 * Copyright 2023, SumUp Ltd.
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

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

const components = [
  {
    name: 'RadioButton',
    alternative: 'Use the RadioButtonGroup component instead.',
  },
  {
    name: 'Selector',
    alternative: 'Use the SelectorGroup component instead.',
  },
];

export const noDeprecatedComponents = createRule({
  name: 'no-deprecated-components',
  meta: {
    type: 'suggestion',
    schema: [],
    docs: {
      description: 'Deprecated components should be removed or replaced',
      recommended: 'strict',
    },
    messages: {
      deprecated: 'The {{name}} component has been deprecated. {{alternative}}',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      'ImportDeclaration:has(Literal[value="@sumup/circuit-ui"])': (
        node: TSESTree.ImportDeclaration,
      ) => {
        node.specifiers.forEach((specifier) => {
          if (specifier.type !== 'ImportSpecifier') {
            return;
          }

          const component = components.find(
            ({ name }) => name === specifier.imported.name,
          );

          if (!component) {
            return;
          }

          context.report({
            node: specifier,
            messageId: 'deprecated',
            data: component,
          });
        });
      },
    };
  },
});
