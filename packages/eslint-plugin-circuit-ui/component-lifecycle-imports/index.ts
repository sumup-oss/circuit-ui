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

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

const mappings = [
  {
    from: '@sumup/circuit-ui',
    to: '@sumup/circuit-ui/legacy',
    specifiers: [
      'RadioButton',
      'RadioButtonProps',
      'RangePicker',
      'RangePickerProps',
      'RangePickerController',
      'RangePickerControllerProps',
      'Selector',
      'SelectorProps',
      'SingleDayPicker',
      'SingleDayPickerProps',
      'CalendarConstants',
      'CalendarTag',
      'CalendarTagProps',
      'CalendarTagTwoStep',
      'CalendarTagTwoStepProps',
      'Grid',
      'Row',
      'Col',
      'ColProps',
      'InlineElements',
      'InlineElementsProps',
      'Header',
      'HeaderProps',
      'Sidebar',
      'SidebarProps',
      'SidebarContextProvider',
      'SidebarContextConsumer',
      'Tooltip',
      'TooltipProps',
      'uniqueId',
      'cx',
      'spacing',
      'shadow',
      'disableVisually',
      'hideVisually',
      'focusOutline',
      'focusVisible',
      'clearfix',
      'hideScrollbar',
      'inputOutline',
      'typography',
      'center',
    ],
  },
];

export const componentLifecycleImports = createRule({
  name: 'component-lifecycle-imports',
  meta: {
    type: 'suggestion',
    schema: [],
    fixable: 'code',
    docs: {
      description:
        'Components that have moved to a different stage in their lifecycle should be imported from the relevant path.',
      recommended: 'recommended',
    },
    messages: {
      refactor:
        '`{{name}}` has moved to a different stage in its lifecycle. Import it from `{{source}}` instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    return mappings.reduce((visitors, config) => {
      const { from, to, specifiers } = config;

      return Object.assign(visitors, {
        [`ImportDeclaration:has(Literal[value="${from}"])`]: (
          node: TSESTree.ImportDeclaration,
        ) => {
          node.specifiers.forEach((specifier) => {
            if (specifier.type !== 'ImportSpecifier') {
              return;
            }

            const importedName = specifier.imported.name;
            const localName = specifier.local.name;

            if (!specifiers.includes(importedName)) {
              return;
            }

            const importStatement =
              node.importKind === 'type' ? 'import type' : 'import';
            const importSpecifier =
              importedName === localName
                ? importedName
                : `${importedName} as ${localName}`;

            context.report({
              node: specifier,
              messageId: 'refactor',
              data: { name: importedName, source: to },
              fix(fixer) {
                const fixes = [];

                if (node.specifiers.length === 1) {
                  // Remove the import entirely if there's only one specifier
                  fixes.push(fixer.remove(node));
                } else {
                  // ...otherwise, only remove the specifier
                  fixes.push(
                    fixer.replaceText(
                      node,
                      context
                        .getSourceCode()
                        .getText(node)
                        .replace(importSpecifier, '')
                        .replace(' ,', ''),
                    ),
                  );
                }

                // Insert the new import
                fixes.push(
                  fixer.insertTextAfter(
                    node,
                    `${importStatement} { ${importSpecifier} } from '${to}';`,
                  ),
                );

                return fixes;
              },
            });
          });
        },
      });
    }, {});
  },
});
