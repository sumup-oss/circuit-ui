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

import {
  ESLintUtils,
  type TSESTree,
  type TSESLint,
} from '@typescript-eslint/utils';

import {
  filterWhitespaceChildren,
  findAttribute,
  getAttributeValue,
  transformAttributeValueToChildren,
} from '../utils/jsx';
import { getPropertyValue } from '../utils/object';

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type PropNameConfig = {
  type: 'name';
  component: string;
  hook?: string;
  props: Record<string, string>;
};

type PropValuesConfig = {
  type: 'values';
  component: string;
  hook?: string;
  prop: string;
  values: Record<string, string>;
};

type CustomConfig = {
  type: 'custom';
  component: string;
  hook?: string;
  transform: (
    node: TSESTree.JSXElement,
    context: TSESLint.RuleContext<'propName' | 'propValue', never[]>,
  ) => void;
};

type Config = PropNameConfig | PropValuesConfig | CustomConfig;

const configs: Config[] = [
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
    hook: 'setToast',
    prop: 'variant',
    values: {
      confirm: 'success',
      notify: 'warning',
      alert: 'danger',
    },
  },
  {
    type: 'values',
    component: 'Button',
    prop: 'size',
    values: {
      kilo: 's',
      giga: 'm',
    },
  },
  {
    type: 'values',
    component: 'CloseButton',
    prop: 'size',
    values: {
      kilo: 's',
      giga: 'm',
    },
  },
  {
    type: 'values',
    component: 'IconButton',
    prop: 'size',
    values: {
      kilo: 's',
      giga: 'm',
    },
  },
  {
    type: 'values',
    component: 'Hamburger',
    prop: 'size',
    values: {
      kilo: 's',
      giga: 'm',
    },
  },
  {
    type: 'values',
    component: 'Avatar',
    prop: 'size',
    values: {
      giga: 's',
      yotta: 'm',
    },
  },
  {
    type: 'values',
    component: 'ProgressBar',
    prop: 'size',
    values: {
      byte: 's',
      kilo: 'm',
      mega: 'l',
    },
  },
  {
    type: 'values',
    component: 'Selector',
    prop: 'size',
    values: {
      kilo: 's',
      mega: 'm',
    },
  },
  {
    type: 'values',
    component: 'Spinner',
    prop: 'size',
    values: {
      byte: 's',
      kilo: 'm',
      giga: 'l',
    },
  },
  {
    type: 'custom',
    component: 'IconButton',
    // children → icon
    transform: (node, context) => {
      const component = 'IconButton';
      const current = 'children';
      const replacement = 'icon';

      const iconAttribute = findAttribute(node, 'icon');

      // Icon is passed as a prop as intended.
      if (iconAttribute) {
        return;
      }

      const children = filterWhitespaceChildren(node.children);
      const child = children[0];

      // Icon might be passed as children, however, these types of children
      // can't be automatically replaced:
      if (
        // No or multiple children
        children.length !== 1 ||
        // Non-element child
        child.type !== 'JSXElement' ||
        // Element with children
        child.children.length > 0 ||
        // Element with props other than `size`
        child.openingElement.attributes.filter(
          (attr) => attr.type !== 'JSXAttribute' || attr.name.name !== 'size',
        ).length > 0
      ) {
        context.report({
          node,
          messageId: 'propName',
          data: { component, current, replacement },
        });
        return;
      }

      const iconName = (child.openingElement.name as TSESTree.JSXIdentifier)
        .name;

      context.report({
        node: node,
        messageId: 'propName',
        data: { component, current, replacement },
        fix(fixer) {
          const range: [number, number] = [
            node.openingElement.range[1] - 1,
            node.closingElement!.range[1],
          ];
          const prop = ` ${replacement}={${iconName}}`;

          return [
            fixer.insertTextBeforeRange(range, prop),
            fixer.replaceTextRange(range, ' />'),
          ];
        },
      });
    },
  },
  {
    type: 'custom',
    component: 'IconButton',
    // label → children
    transform: (node, context) => {
      const component = 'IconButton';
      const current = 'label';
      const replacement = 'children';

      const labelAttribute = findAttribute(node, 'label');

      if (!labelAttribute) {
        return;
      }

      const labelValue = transformAttributeValueToChildren(
        context.sourceCode,
        labelAttribute,
      );

      if (
        // Unable to transform the label value
        !labelValue ||
        // Shouldn't override existing children
        node.children.length > 0
      ) {
        context.report({
          node: labelAttribute,
          messageId: 'propName',
          data: { component, current, replacement },
        });
        return;
      }

      context.report({
        node,
        messageId: 'propName',
        data: { component, current, replacement },
        fix(fixer) {
          const elementName = (
            node.openingElement.name as TSESTree.JSXIdentifier
          ).name;
          const range: [number, number] = [
            node.openingElement.range[1] - 2,
            node.openingElement.range[1],
          ];

          return [
            fixer.remove(labelAttribute!),
            fixer.replaceTextRange(range, `>${labelValue}</${elementName}>`),
          ];
        },
      });
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
      recommended: 'recommended',
    },
    messages: {
      propName:
        "The {{component}}'s `{{current}}` prop has been renamed to `{{replacement}}`.",
      propValue:
        "The {{component}}'s `{{prop}}` prop values have been renamed. Replace `{{current}}` with `{{replacement}}`.",
    },
  },
  defaultOptions: [],
  create(context) {
    function replaceComponentPropName(
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
          node: attribute,
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

    function replaceComponentPropValues(
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
          node: attribute,
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

    function replaceHookPropValues(
      node: TSESTree.CallExpression,
      config: PropValuesConfig,
    ) {
      const { hook, prop, values } = config;

      node.arguments.forEach((argument) => {
        if (argument.type !== 'ObjectExpression') {
          return;
        }

        argument.properties.forEach((property) => {
          if (
            property.type !== 'Property' ||
            property.key.type !== 'Identifier' ||
            property.key.name !== prop
          ) {
            return;
          }

          const current = getPropertyValue(property);

          if (!current) {
            return;
          }

          const replacement = values[current];

          if (!replacement) {
            return;
          }

          context.report({
            node: property,
            messageId: 'propValue',
            data: { component: hook, prop, current, replacement },
            fix(fixer) {
              return fixer.replaceText(
                property.value as TSESTree.Literal,
                `'${replacement}'`,
              );
            },
          });
        });
      });
    }

    const components = configs.reduce(
      (acc, config) => {
        acc[config.component] = acc[config.component] || [];
        acc[config.component].push(config);
        return acc;
      },
      {} as Record<string, Config[]>,
    );

    const componentVisitors = Object.entries(components).reduce(
      (visitors, [component, configs]) => {
        // eslint-disable-next-line no-param-reassign
        visitors[`JSXElement[openingElement.name.name="${component}"]`] = (
          node: TSESTree.JSXElement,
        ) => {
          configs.forEach((config) => {
            switch (config.type) {
              case 'name':
                replaceComponentPropName(node, config);
                break;
              case 'values':
                replaceComponentPropValues(node, config);
                break;
              case 'custom':
                config.transform(node, context);
                break;
            }
          });
        };
        return visitors;
      },
      {} as TSESLint.RuleListener,
    );

    const hooks = configs.reduce(
      (acc, config) => {
        if (!config.hook) {
          return acc;
        }
        acc[config.hook] = acc[config.hook] || [];
        acc[config.hook].push(config);
        return acc;
      },
      {} as Record<string, Config[]>,
    );

    const hookVisitors = Object.entries(hooks).reduce(
      (visitors, [hook, configs]) => {
        // eslint-disable-next-line no-param-reassign
        visitors[`CallExpression[callee.name="${hook}"]`] = (
          node: TSESTree.CallExpression,
        ) => {
          configs.forEach((config) => {
            switch (config.type) {
              case 'values':
                replaceHookPropValues(node, config);
                break;
              case 'name':
              case 'custom':
                // TODO: Not needed yet.
                break;
            }
          });
        };
        return visitors;
      },
      {} as TSESLint.RuleListener,
    );

    return { ...componentVisitors, ...hookVisitors };
  },
});
