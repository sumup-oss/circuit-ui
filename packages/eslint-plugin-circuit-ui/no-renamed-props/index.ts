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

import {
  filterWhitespaceChildren,
  findAttribute,
  getAttributeValue,
  isAttributeTruthy,
  isStaticAttribute,
  transformAttributeValueToChildren,
} from '../utils/jsx.js';
import type { RuleDocs } from '../utils/meta.js';

const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type PropValuesConfig = {
  type: 'values';
  prop: string;
  values: Record<string, string>;
};

type CustomConfig = {
  type: 'custom';
  transform: (
    node: TSESTree.JSXElement,
    component: string,
    context: TSESLint.RuleContext<
      'propName' | 'propValue' | 'bodyVariant',
      never[]
    >,
  ) => void;
};

type Config = PropValuesConfig | CustomConfig;

// Mirrors the `colorMap` in Badge.tsx that the deprecated component uses
// internally to render a Status.
const badgeColorMap: Record<string, string> = {
  neutral: 'neutral',
  success: 'confirm',
  warning: 'notify',
  danger: 'alert',
  promo: 'promo',
};

const configs: (Config & { components: string[] })[] = [
  {
    type: 'values',
    components: ['Button', 'CloseButton', 'IconButton'],
    prop: 'size',
    values: {
      kilo: 's',
      giga: 'm',
    },
  },
  {
    type: 'values',
    components: ['Hamburger'],
    prop: 'size',
    values: {
      kilo: 's',
      giga: 'm',
    },
  },
  {
    type: 'values',
    components: ['Avatar'],
    prop: 'size',
    values: {
      giga: 's',
      yotta: 'm',
    },
  },
  {
    type: 'values',
    components: ['ProgressBar'],
    prop: 'size',
    values: {
      byte: 's',
      kilo: 'm',
      mega: 'l',
    },
  },
  {
    type: 'values',
    components: ['SelectorGroup'],
    prop: 'size',
    values: {
      kilo: 's',
      mega: 'm',
    },
  },
  {
    type: 'values',
    components: ['Spinner'],
    prop: 'size',
    values: {
      byte: 's',
      kilo: 'm',
      giga: 'l',
    },
  },
  {
    type: 'custom',
    components: ['IconButton'],
    // children → icon
    transform: (node, component, context) => {
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
        child.type !== TSESTree.AST_NODE_TYPES.JSXElement ||
        // Element with children
        child.children.length > 0 ||
        // Element with props other than `size`
        child.openingElement.attributes.filter(
          (attr) =>
            attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
            attr.name.name !== 'size',
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
        node,
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
    components: ['IconButton'],
    // label → children
    transform: (node, component, context) => {
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
            fixer.remove(labelAttribute),
            fixer.replaceTextRange(range, `>${labelValue}</${elementName}>`),
          ];
        },
      });
    },
  },
  {
    type: 'values',
    components: ['Title', 'Display'],
    prop: 'size',
    values: {
      one: 'l',
      two: 'm',
      three: 'm',
      four: 's',
    },
  },
  {
    type: 'values',
    components: ['Headline'],
    prop: 'size',
    values: {
      one: 'l',
      two: 'm',
      three: 's',
      four: 's',
    },
  },
  {
    type: 'values',
    components: ['Anchor', 'Body', 'List'],
    prop: 'size',
    values: {
      one: 'm',
      two: 's',
    },
  },
  {
    type: 'custom',
    components: ['Anchor', 'Body'],
    // variant → weight or color
    transform: (node, component, context) => {
      node.openingElement.attributes.forEach((attribute) => {
        if (
          attribute.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
          attribute.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier ||
          attribute.name.name !== 'variant'
        ) {
          return;
        }

        const current = getAttributeValue(attribute);

        if (current === 'highlight') {
          const asAttribute = findAttribute(node, 'as');
          const weightAttribute = findAttribute(node, 'weight');
          const replacement = asAttribute ? 'weight="semibold"' : `as="strong"`;
          context.report({
            node: attribute,
            messageId: 'bodyVariant',
            data: { component, current, replacement },
            fix: weightAttribute
              ? undefined
              : (fixer) => fixer.replaceText(attribute, replacement),
          });
          return;
        }

        if (current && ['alert', 'confirm', 'subtle'].includes(current)) {
          const replacementMap: Record<string, string> = {
            'alert': `color="danger"`,
            'confirm': `color="success"`,
            'subtle': `color="subtle"`,
          };
          const replacement = replacementMap[current];
          const colorAttribute = findAttribute(node, 'color');
          context.report({
            node: attribute,
            messageId: 'bodyVariant',
            data: { component, current, replacement },
            fix: colorAttribute
              ? undefined
              : (fixer) => fixer.replaceText(attribute, replacement),
          });
        }
      });
    },
  },
  {
    type: 'custom',
    components: ['Badge'],
    // variant → color, circle → variant
    transform: (node, component, context) => {
      const variantAttribute = findAttribute(node, 'variant');
      const circleAttribute = findAttribute(node, 'circle');

      if (!variantAttribute && !circleAttribute) {
        return;
      }

      const variantValue = variantAttribute
        ? getAttributeValue(variantAttribute)
        : null;
      const color = variantValue ? badgeColorMap[variantValue] : undefined;
      // A static value that is not recognised (e.g. `"badge"`, `"pill"`) isn't
      // an old Badge `variant`. it's already Status-shaped data
      // (typically our own `circle` fix, applied in an earlier pass), so
      // do nothing instead of reporting a false positive.
      const isKnownOldVariant = Boolean(variantValue && color);
      const variantNeedsAttention =
        variantAttribute &&
        (!isStaticAttribute(variantAttribute) || isKnownOldVariant);

      // Both props are fixed together, or neither is: `circle` maps onto
      // `variant`, so if the pre-existing `variant` (Badge's) can't be
      // safely renamed to `color`, inserting `variant="badge"` for `circle`
      // would collide with the untouched original `variant` attribute.
      const canFix =
        (!variantNeedsAttention || isKnownOldVariant) &&
        (!circleAttribute || isStaticAttribute(circleAttribute));

      if (variantNeedsAttention) {
        context.report({
          node: variantAttribute,
          messageId: 'propName',
          data: { component, current: 'variant', replacement: 'color' },
          fix: canFix
            ? (fixer) => {
                const fixes = [
                  fixer.replaceText(variantAttribute.name, 'color'),
                ];
                if (color !== variantValue) {
                  fixes.push(
                    fixer.replaceText(
                      variantAttribute.value as TSESTree.Literal,
                      `"${color}"`,
                    ),
                  );
                }
                return fixes;
              }
            : undefined,
        });
      }

      if (circleAttribute) {
        context.report({
          node: circleAttribute,
          messageId: 'propName',
          data: { component, current: 'circle', replacement: 'variant' },
          fix: canFix
            ? (fixer) => {
                if (isAttributeTruthy(circleAttribute)) {
                  return fixer.replaceText(circleAttribute, 'variant="badge"');
                }
                // Also remove the whitespace preceding the attribute so we
                // don't leave a stray space behind, e.g. `<Status >`.
                const { text } = context.sourceCode;
                let start = circleAttribute.range[0];
                while (start > 0 && /\s/.test(text[start - 1])) {
                  start -= 1;
                }
                return fixer.removeRange([start, circleAttribute.range[1]]);
              }
            : undefined,
        });
      }
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
      recommended: 'off',
    },
    messages: {
      propName:
        "The {{component}}'s `{{current}}` prop has been renamed to `{{replacement}}`.",
      propValue:
        "The {{component}}'s `{{prop}}` prop values have been renamed. Replace `{{current}}` with `{{replacement}}`.",
      bodyVariant:
        'The {{component}}\'s `variant` prop has been deprecated. Replace `variant="{{current}}"` with `{{replacement}}`.',
    },
  },
  defaultOptions: [],
  create(context) {
    function replaceComponentPropValues(
      node: TSESTree.JSXElement,
      component: string,
      config: PropValuesConfig,
    ) {
      const { prop, values } = config;

      node.openingElement.attributes.forEach((attribute) => {
        if (
          attribute.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
          attribute.name.name !== prop
        ) {
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

    const componentConfigs = configs.reduce(
      (acc, config) => {
        const { components, ...rest } = config;
        config.components.forEach((component) => {
          acc[component] = acc[component] || [];
          acc[component].push(rest);
        });
        return acc;
      },
      {} as Record<string, Config[]>,
    );

    return Object.entries(componentConfigs).reduce(
      (visitors, [component, configurations]) => {
        visitors[`JSXElement[openingElement.name.name="${component}"]`] = (
          node: TSESTree.JSXElement,
        ) => {
          configurations.forEach((config) => {
            switch (config.type) {
              case 'values':
                replaceComponentPropValues(node, component, config);
                break;
              case 'custom':
                config.transform(node, component, context);
                break;
            }
          });
        };
        return visitors;
      },
      {} as TSESLint.RuleListener,
    );
  },
});
