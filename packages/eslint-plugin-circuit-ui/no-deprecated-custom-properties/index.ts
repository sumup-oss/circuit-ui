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

import { ESLintUtils } from '@typescript-eslint/utils';
import { schema } from '@sumup-oss/design-tokens';

const DEPRECATED_CUSTOM_PROPERTIES = schema.filter(({ deprecation }) =>
  Boolean(deprecation),
);
const REGEX_STRING = DEPRECATED_CUSTOM_PROPERTIES.map(({ name }) => name).join(
  '|',
);

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

export const noDeprecatedCustomProperties = createRule({
  name: 'no-deprecated-custom-properties',
  meta: {
    type: 'suggestion',
    schema: [],
    fixable: 'code',
    docs: {
      description: 'Deprecated custom properties should be removed or replaced',
      recommended: 'strict',
    },
    messages: {
      deprecated:
        'The `{{name}}` custom property has been deprecated. Use the `{{replacement}}` custom property instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // Inspired by `no-tabs`: https://github.com/eslint/eslint/blob/b98fdd413a3b07b262bfce6f704c1c1bb8582770/lib/rules/no-tabs.js
      Program(node) {
        context.sourceCode.getLines().forEach((line, index) => {
          const regex = new RegExp(REGEX_STRING, 'g');
          let match: RegExpExecArray | null;
          // biome-ignore lint/suspicious/noAssignInExpressions:
          while ((match = regex.exec(line)) !== null) {
            const name = match[0];
            const { replacement } = DEPRECATED_CUSTOM_PROPERTIES.find(
              (token) => token.name === name,
            )!.deprecation!;
            context.report({
              node,
              loc: {
                start: {
                  line: index + 1,
                  column: match.index,
                },
                end: {
                  line: index + 1,
                  column: match.index + match[0].length,
                },
              },
              messageId: 'deprecated',
              data: {
                name,
                replacement,
              },
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  context.sourceCode.getText(node).replace(name, replacement),
                );
              },
            });
          }
        });
      },
    };
  },
});
