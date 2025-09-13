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

import type { RuleDocs } from '../utils/meta.js';

const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

const components = [
  {
    name: 'Popover',
    alternative: 'ActionMenu',
  },
  {
    name: 'PopoverProps',
    alternative: 'ActionMenuProps',
  },
  {
    name: 'PopoverItemProps',
    alternative: 'ActionMenuItemProps',
  },
];

export const noRenamedComponents = createRule({
  name: 'no-renamed-components',
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [],
    docs: {
      description:
        'Renamed components should be renamed to suggested alternatives',
      recommended: 'off',
    },
    messages: {
      renamed: 'The {{name}} component has been renamed to {{alternative}}',
    },
  },
  defaultOptions: [],
  create(context) {
    const trackedImports = new Map(); // Track imported components and their sources.

    return {
      ImportDeclaration(node) {
        if (node.source.value === '@sumup-oss/circuit-ui') {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
              trackedImports.set(specifier.local.name, node.source.value);
              const importedName =
                specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier
                  ? specifier.imported.name
                  : specifier.imported.value;
              const renamedComponent = components.find(
                (comp) =>
                  comp.name === specifier.local.name ||
                  comp.name === importedName,
              );
              if (!renamedComponent) {
                return;
              }
              context.report({
                node,
                messageId: 'renamed',
                data: {
                  name: renamedComponent?.name,
                  alternative: renamedComponent?.alternative,
                },
                fix(fixer) {
                  return fixer.replaceText(
                    node,
                    context.sourceCode
                      .getText(node)
                      .replace(
                        renamedComponent?.name,
                        renamedComponent?.alternative,
                      ),
                  );
                },
              });
            }
          });
        }
      },
      JSXIdentifier(node) {
        // Check if the JSX element matches the tracked component
        if (trackedImports.has(node.name)) {
          const renamedComponent = components.find(
            (comp) => comp.name === node.name,
          );
          if (!renamedComponent) {
            return;
          }
          context.report({
            node,
            messageId: 'renamed',
            data: {
              name: renamedComponent?.name,
              alternative: renamedComponent?.alternative,
            },
            fix(fixer) {
              return fixer.replaceText(
                node,
                context.sourceCode
                  .getText(node)
                  .replace(
                    renamedComponent?.name,
                    renamedComponent?.alternative,
                  ),
              );
            },
          });
        }
      },
    };
  },
});
