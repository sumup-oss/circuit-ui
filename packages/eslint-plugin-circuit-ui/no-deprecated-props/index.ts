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

import { ESLintUtils, TSESTree, type TSESLint } from '@typescript-eslint/utils';
import type { RuleDocs } from '../utils/meta.js';

const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type ValueConfig = {
  components: string[];
  prop: string;
  values: string[];
  alternative: string;
};

// TODO: When a deprecated value is removed from a component in a major version,
// remove the corresponding entry here
const valueMappings: ValueConfig[] = [
  {
    components: ['Body'],
    prop: 'size',
    values: ['one', 'two'],
    alternative: 'Use "m" instead of "one" and "s" instead of "two".',
  },
  {
    components: ['Body', 'Numeral'],
    prop: 'decoration',
    values: ['italic'],
    alternative:
      'Since the brand refresh, italic text is no longer supported. The `italic` decoration will be removed in the next major version.',
  },
];

export const noDeprecatedProps = createRule({
  name: 'no-deprecated-props',
  meta: {
    type: 'suggestion',
    schema: [],
    docs: {
      description: 'Deprecated component props should be removed or replaced',
      recommended: 'warn',
    },
    messages: {
      deprecatedValue:
        'The {{component}}\'s `{{prop}}` prop value "{{value}}" has been deprecated. {{alternative}}',
    },
  },
  defaultOptions: [],
  create(context) {
    const visitors: TSESLint.RuleListener = {};

    valueMappings.forEach((config) => {
      config.components.forEach((component) => {
        const key = `JSXElement[openingElement.name.name="${component}"]`;
        const existing = visitors[key] as
          | ((node: TSESTree.JSXElement) => void)
          | undefined;

        visitors[key] = (node: TSESTree.JSXElement) => {
          existing?.(node);
          node.openingElement.attributes.forEach((attribute) => {
            if (
              attribute.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
              attribute.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier ||
              attribute.name.name !== config.prop
            ) {
              return;
            }

            let value: string | null = null;

            if (
              attribute.value?.type === TSESTree.AST_NODE_TYPES.Literal &&
              typeof attribute.value.value === 'string'
            ) {
              value = attribute.value.value;
            } else if (
              attribute.value?.type ===
                TSESTree.AST_NODE_TYPES.JSXExpressionContainer &&
              attribute.value.expression.type ===
                TSESTree.AST_NODE_TYPES.Literal &&
              typeof attribute.value.expression.value === 'string'
            ) {
              value = attribute.value.expression.value;
            }

            if (value === null || !config.values.includes(value)) {
              return;
            }

            context.report({
              node: attribute,
              messageId: 'deprecatedValue',
              data: {
                component,
                prop: config.prop,
                value,
                alternative: config.alternative,
              },
            });
          });
        };
      });
    });

    return visitors;
  },
});
