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

import { ESLintUtils, TSESTree, TSESLint } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type PropNameConfig = {
  type: 'name';
  component: string;
  props: Record<string, string>;
};

type PropValuesConfig = {
  type: 'values';
  component: string;
  prop: string;
  values: Record<string, string>;
};

const configs: (PropNameConfig | PropValuesConfig)[] = [
  {
    type: 'name',
    component: 'Toggle',
    props: {
      explanation: 'description',
    },
  },
  {
    type: 'values',
    component: 'Badge',
    prop: 'variant',
    values: {
      confirm: 'success',
      notify: 'warning',
      alert: 'danger',
    },
  },
  {
    type: 'values',
    component: 'NotificationInline',
    prop: 'variant',
    values: {
      confirm: 'success',
      notify: 'warning',
      alert: 'danger',
    },
  },
  {
    type: 'values',
    component: 'NotificationToast',
    prop: 'variant',
    values: {
      confirm: 'success',
      notify: 'warning',
      alert: 'danger',
    },
  },
];

export const noRenamedProps = createRule({
  name: 'no-renamed-props',
  meta: {
    type: 'suggestion',
    schema: [],
    fixable: 'code',
    docs: {
      description: 'Component props should use the latest names',
      recommended: 'error',
    },
    messages: {
      propName:
        "The {{component}}'s `{{current}}` prop has been renamed to '{{replacement}}'.",
      propValue:
        "The {{component}}'s `{{prop}}` prop values have been renamed. Replace '{{current}}' with '{{replacement}}'.",
    },
  },
  defaultOptions: [],
  create(context) {
    function replacePropName(
      node: TSESTree.JSXElement,
      config: PropNameConfig,
    ) {
      const { component, props } = config;

      node.openingElement.attributes.forEach((attribute) => {
        if (
          attribute.type !== 'JSXAttribute' ||
          attribute.name.type !== 'JSXIdentifier'
        ) {
          return;
        }

        const current = attribute.name.name;
        const replacement = props[current];

        if (!replacement) {
          return;
        }

        context.report({
          node,
          messageId: 'propName',
          data: { component, current, replacement },
          fix(fixer) {
            return fixer.replaceText(
              attribute.name as TSESTree.JSXIdentifier,
              replacement,
            );
          },
        });
      });
    }

    function replacePropValues(
      node: TSESTree.JSXElement,
      config: PropValuesConfig,
    ) {
      const { component, prop, values } = config;

      node.openingElement.attributes.forEach((attribute) => {
        if (attribute.type !== 'JSXAttribute' || attribute.name.name !== prop) {
          return;
        }

        const current = getAttributeValue(attribute);

        if (!current) {
          return;
        }

        const replacement = values[current];

        if (!replacement) {
          return;
        }

        context.report({
          node,
          messageId: 'propValue',
          data: { component, prop, current, replacement },
          fix(fixer) {
            return fixer.replaceText(
              attribute.value as TSESTree.Literal,
              `"${replacement}"`,
            );
          },
        });
      });
    }

    return configs.reduce((visitors, config) => {
      // eslint-disable-next-line no-param-reassign
      visitors[`JSXElement:has(JSXIdentifier[name="${config.component}"])`] = (
        node: TSESTree.JSXElement,
      ) => {
        if (config.type === 'name') {
          replacePropName(node, config);
        }
        if (config.type === 'values') {
          replacePropValues(node, config);
        }
      };
      return visitors;
    }, {} as TSESLint.RuleListener);
  },
});

function getAttributeValue(attribute: TSESTree.JSXAttribute): string | null {
  if (attribute.value?.type === 'Literal') {
    return attribute.value.value as string;
  }
  if (
    attribute.value?.type === 'JSXExpressionContainer' &&
    attribute.value.expression.type === 'Literal'
  ) {
    return attribute.value.expression.value as string;
  }
  return null;
}
