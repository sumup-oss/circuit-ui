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
import { schema } from '@sumup/design-tokens';

const PREFIX = '--cui-';
const VALID_CUSTOM_PROPERTIES_WITHOUT_PREFIX = schema.map(({ name }) =>
  name.replace(PREFIX, ''),
);
const REGEX_STRING = `(?:${PREFIX})(?!(?:${VALID_CUSTOM_PROPERTIES_WITHOUT_PREFIX.join(
  '|',
)})[^\\w-])[\\w-]+`;

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

export const noInvalidCustomProperties = createRule({
  name: 'no-invalid-custom-properties',
  meta: {
    type: 'problem',
    schema: [],
    docs: {
      description:
        'Custom properties prefixed with `--cui-` should be valid Circuit UI design tokens.',
      recommended: 'recommended',
    },
    messages: {
      invalid: "'{{name}}' is not a valid Circuit UI design token.",
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      // Inspired by `no-tabs`: https://github.com/eslint/eslint/blob/b98fdd413a3b07b262bfce6f704c1c1bb8582770/lib/rules/no-tabs.js
      Program(node) {
        sourceCode.getLines().forEach((line, index) => {
          const regex = new RegExp(REGEX_STRING, 'g');
          let match: RegExpExecArray | null;
          // biome-ignore lint/suspicious/noAssignInExpressions:
          while ((match = regex.exec(line)) !== null) {
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
              messageId: 'invalid',
              data: {
                name: match[0],
              },
            });
          }
        });
      },
    };
  },
});
