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

const VALID_CUSTOM_PROPERTIES_WITHOUT_PREFIX = [
  /* Neutral backgrounds */
  'bg-normal',
  'bg-normal-hovered',
  'bg-normal-pressed',
  'bg-normal-disabled',
  'bg-subtle',
  'bg-subtle-hovered',
  'bg-subtle-pressed',
  'bg-subtle-disabled',
  'bg-highlight',
  'bg-highlight-hovered',
  'bg-highlight-pressed',
  'bg-highlight-disabled',
  'bg-strong',
  'bg-strong-hovered',
  'bg-strong-pressed',
  'bg-strong-disabled',
  /* Accent backgrounds */
  'bg-accent',
  'bg-accent-hovered',
  'bg-accent-pressed',
  'bg-accent-disabled',
  'bg-accent-strong',
  'bg-accent-strong-hovered',
  'bg-accent-strong-pressed',
  'bg-accent-strong-disabled',
  /* Success backgrounds */
  'bg-success',
  'bg-success-hovered',
  'bg-success-pressed',
  'bg-success-disabled',
  'bg-success-strong',
  'bg-success-strong-hovered',
  'bg-success-strong-pressed',
  'bg-success-strong-disabled',
  /* Warning backgrounds */
  'bg-warning',
  'bg-warning-hovered',
  'bg-warning-pressed',
  'bg-warning-disabled',
  'bg-warning-strong',
  'bg-warning-strong-hovered',
  'bg-warning-strong-pressed',
  'bg-warning-strong-disabled',
  /* Danger backgrounds */
  'bg-danger',
  'bg-danger-hovered',
  'bg-danger-pressed',
  'bg-danger-disabled',
  'bg-danger-strong',
  'bg-danger-strong-hovered',
  'bg-danger-strong-pressed',
  'bg-danger-strong-disabled',
  /* Promo backgrounds */
  'bg-promo',
  'bg-promo-hovered',
  'bg-promo-pressed',
  'bg-promo-disabled',
  'bg-promo-strong',
  'bg-promo-strong-hovered',
  'bg-promo-strong-pressed',
  'bg-promo-strong-disabled',
  /* Neutral foregrounds */
  'fg-normal',
  'fg-normal-hovered',
  'fg-normal-pressed',
  'fg-normal-disabled',
  'fg-subtle',
  'fg-subtle-hovered',
  'fg-subtle-pressed',
  'fg-subtle-disabled',
  'fg-placeholder',
  'fg-placeholder-hovered',
  'fg-placeholder-pressed',
  'fg-placeholder-disabled',
  'fg-on-strong',
  'fg-on-strong-hovered',
  'fg-on-strong-pressed',
  'fg-on-strong-disabled',
  /* Accent foregrounds */
  'fg-accent',
  'fg-accent-hovered',
  'fg-accent-pressed',
  'fg-accent-disabled',
  /* Success foregrounds */
  'fg-success',
  'fg-success-hovered',
  'fg-success-pressed',
  'fg-success-disabled',
  /* Warning foregrounds */
  'fg-warning',
  'fg-warning-hovered',
  'fg-warning-pressed',
  'fg-warning-disabled',
  /* Danger foregrounds */
  'fg-danger',
  'fg-danger-hovered',
  'fg-danger-pressed',
  'fg-danger-disabled',
  /* Promo foregrounds */
  'fg-promo',
  'fg-promo-hovered',
  'fg-promo-pressed',
  'fg-promo-disabled',
  /* Neutral borders */
  'border-normal',
  'border-normal-hovered',
  'border-normal-pressed',
  'border-normal-disabled',
  'border-subtle',
  'border-subtle-hovered',
  'border-subtle-pressed',
  'border-subtle-disabled',
  'border-divider',
  'border-divider-hovered',
  'border-divider-pressed',
  'border-divider-disabled',
  'border-strong',
  'border-strong-hovered',
  'border-strong-pressed',
  'border-strong-disabled',
  /* Accent borders */
  'border-accent',
  'border-accent-hovered',
  'border-accent-pressed',
  'border-accent-disabled',
  /* Success borders */
  'border-success',
  'border-success-hovered',
  'border-success-pressed',
  'border-success-disabled',
  /* Warning borders */
  'border-warning',
  'border-warning-hovered',
  'border-warning-pressed',
  'border-warning-disabled',
  /* Danger borders */
  'border-danger',
  'border-danger-hovered',
  'border-danger-pressed',
  'border-danger-disabled',
  /* Promo borders */
  'border-promo',
  'border-promo-hovered',
  'border-promo-pressed',
  'border-promo-disabled',
  /* Special colors */
  'bg-overlay',
  'bg-elevated',
  'border-focus',
];

const REGEX_STRING = `(?:--cui-)(?!(?:${VALID_CUSTOM_PROPERTIES_WITHOUT_PREFIX.join(
  '|',
)})[^\\w-])[\\w-]+`;
const REGEX = new RegExp(REGEX_STRING, 'g');

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
        'Custom properties prefixed with `--cui` should be valid Circuit UI color tokens.',
      recommended: 'error',
    },
    messages: {
      invalid: '"{{name}}" is not a valid Circuit UI color token.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      // Inspired by `no-tabs`: https://github.com/eslint/eslint/blob/b98fdd413a3b07b262bfce6f704c1c1bb8582770/lib/rules/no-tabs.js
      Program(node) {
        sourceCode.getLines().forEach((line, index) => {
          let match;
          // eslint-disable-next-line no-cond-assign
          while ((match = REGEX.exec(line)) !== null) {
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
