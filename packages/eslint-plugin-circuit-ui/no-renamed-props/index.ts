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

const configs: (PropNameConfig | PropValuesConfig | CustomConfig)[] = [
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
    transform: (node, context) => {
      const component = 'IconButton';
      const current = 'children';
      const replacement = 'icon';

      const children = filterWhitespaceChildren(node.children);
      const child = children[0];

      // These cases can't be automatically fixed:
      if (
        // Multiple children
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

      const childName = (child.openingElement.name as TSESTree.JSXIdentifier)
        .name;

      context.report({
        node: node,
        messageId: 'propName',
        data: { component, current, replacement },
        fix(fixer) {
          const prop = `${replacement}={${childName}}`;
          return replaceChildrenWithProp(fixer, node, prop);
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

      // The `children` prop isn't a `JSXAttribute` and needs to be handled separately.
      if (props.children && node.children.length > 0) {
        const current = 'children';
        const replacement = props.children;

        const children = filterWhitespaceChildren(node.children);

        // Multiple children can't be automatically fixed.
        if (children.length !== 1) {
          context.report({
            node,
            messageId: 'propName',
            data: { component, current, replacement },
          });
          return;
        }

        const child = children[0];

        let value: string = '';

        // These are the most common child types, more should be added as needed
        switch (child.type) {
          case 'JSXText': {
            value = `"${child.value.trim()}"`;
            break;
          }
          case 'JSXExpressionContainer': {
            value = context.sourceCode.getText(child);
            break;
          }
          case 'JSXElement': {
            value = `{${context.sourceCode.getText(child)}}`;
            break;
          }
        }

        if (!value) {
          context.report({
            node: children[0],
            messageId: 'propName',
            data: { component, current, replacement },
          });
          return;
        }

        context.report({
          node: node,
          messageId: 'propName',
          data: { component, current, replacement },
          fix(fixer) {
            const prop = `${replacement}=${value}`;
            return replaceChildrenWithProp(fixer, node, prop);
          },
        });
      }
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

    return configs.reduce((visitors, config) => {
      if (config.component) {
        // eslint-disable-next-line no-param-reassign
        visitors[`JSXElement:has(JSXIdentifier[name="${config.component}"])`] =
          (node: TSESTree.JSXElement) => {
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
          };
      }

      if (config.hook) {
        // eslint-disable-next-line no-param-reassign
        visitors[`CallExpression:has(Identifier[name="${config.hook}"])`] = (
          node: TSESTree.CallExpression,
        ) => {
          switch (config.type) {
            case 'values':
              replaceHookPropValues(node, config);
              break;
            case 'name':
            case 'custom':
              // TODO: Not needed yet.
              break;
          }
        };
      }
      return visitors;
    }, {} as TSESLint.RuleListener);
  },
});

function getAttributeValue(attribute: TSESTree.JSXAttribute): string | null {
  if (
    attribute.value?.type === 'Literal' &&
    typeof attribute.value.value === 'string'
  ) {
    return attribute.value.value;
  }
  if (
    attribute.value?.type === 'JSXExpressionContainer' &&
    attribute.value.expression.type === 'Literal'
  ) {
    return attribute.value.expression.value as string;
  }
  return null;
}

function getPropertyValue(property: TSESTree.Property): string | null {
  if (
    property.value.type === 'Literal' &&
    typeof property.value.value === 'string'
  ) {
    return property.value.value;
  }
  return null;
}

function filterWhitespaceChildren(
  children: TSESTree.JSXChild[],
): TSESTree.JSXChild[] {
  return children.filter((child) => {
    if (child.type !== 'JSXText') {
      return true;
    }
    const nonWhiteSpaceText = child.value.trim();
    return Boolean(nonWhiteSpaceText);
  });
}

function replaceChildrenWithProp(
  fixer: TSESLint.RuleFixer,
  node: TSESTree.JSXElement,
  prop: string,
) {
  // Represents the last character of the JSXOpeningElement, the '>' character
  const openingElementEnding = node.openingElement.range[1] - 1;
  // Represents the last character of the JSXClosingElement, the '>' character
  const closingElementEnding = node.closingElement!.range[1];

  const range = [openingElementEnding, closingElementEnding] as const;

  return [
    fixer.insertTextBeforeRange(range, ` ${prop}`),
    fixer.replaceTextRange(range, ' />'),
  ];
}
