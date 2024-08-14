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
    to: '@sumup-oss/circuit-ui',
  },
  {
    from: '@sumup/design-tokens',
    to: '@sumup-oss/design-tokens',
  },
  {
    from: '@sumup/icons',
    to: '@sumup-oss/icons',
  },
  {
    from: '@sumup/intl',
    to: '@sumup-oss/intl',
  },
];

export const renamedPackageScope = createRule({
  name: 'renamed-organization-imports',
  meta: {
    type: 'suggestion',
    schema: [],
    fixable: 'code',
    docs: {
      description:
        'Imports from Circuit UI packages should use the new `@sumup-oss` scope.',
      recommended: 'recommended',
    },
    messages: {
      refactor:
        '`{{from}}` has been renamed to `{{to}}`. Update the import to use `{{to}}` instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    return mappings.reduce((visitors, { from, to }) => {
      // Due to a bug in esquery, regular expressions that contain a
      // forward-slash character aren’t properly parsed. As a workaround, the
      // `/` character can be replaced with its unicode counterpart.
      // See https://eslint.org/docs/latest/extend/selectors#known-issues
      const escapedFrom = from.replace('/', '\\u002F');

      return Object.assign(visitors, {
        [`ImportDeclaration:has(Literal[value=/${escapedFrom}.*/])`]: (
          node: TSESTree.ImportDeclaration,
        ) => {
          context.report({
            node,
            messageId: 'refactor',
            data: { from, to },
            fix(fixer) {
              return fixer.replaceText(
                node,
                context.sourceCode.getText(node).replace(from, to),
              );
            },
          });
        },
      });
    }, {});
  },
});
