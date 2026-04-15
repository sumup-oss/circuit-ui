/**
 * Copyright 2026, SumUp Ltd.
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

const DYNAMIC_VALUE = Symbol('dynamic');
const CIRCUIT_UI_PACKAGE = '@sumup-oss/circuit-ui';

type StaticValue = string | number | boolean;
type AttributeValue = StaticValue | typeof DYNAMIC_VALUE | undefined;

type AttributeValues = Record<string, AttributeValue>;

type RuleConfig = {
  propName: string;
  value: StaticValue;
  isSafeToRemove?: (context: { attributeValues: AttributeValues }) => boolean;
};

const configs: Record<string, RuleConfig[]> = {
  Avatar: [{ propName: 'size', value: 'm' }],
  Badge: [
    { propName: 'as', value: 'div' },
    { propName: 'variant', value: 'neutral' },
  ],
  Body: [
    { propName: 'size', value: 'm' },
    { propName: 'color', value: 'normal' },
    {
      propName: 'as',
      value: 'p',
      isSafeToRemove: ({ attributeValues }) => {
        const { variant } = attributeValues;
        if (variant === DYNAMIC_VALUE) {
          return false;
        }
        return variant !== 'highlight' && variant !== 'quote';
      },
    },
    {
      propName: 'weight',
      value: 'regular',
      isSafeToRemove: ({ attributeValues }) => {
        const { as } = attributeValues;
        if (as === DYNAMIC_VALUE) {
          return false;
        }
        return as !== 'strong';
      },
    },
  ],
  Display: [
    { propName: 'size', value: 'm' },
    { propName: 'weight', value: 'bold' },
  ],
  Button: [
    { propName: 'size', value: 'm' },
    { propName: 'variant', value: 'secondary' },
  ],
  ButtonGroup: [
    { propName: 'align', value: 'center' },
    { propName: 'size', value: 'm' },
  ],
  Card: [
    { propName: 'as', value: 'div' },
    { propName: 'spacing', value: 'giga' },
  ],
  Compact: [
    { propName: 'as', value: 'p' },
    { propName: 'size', value: 'm' },
    { propName: 'weight', value: 'regular' },
    { propName: 'color', value: 'normal' },
  ],
  Headline: [{ propName: 'size', value: 'm' }],
  IconButton: [
    { propName: 'size', value: 'm' },
    { propName: 'variant', value: 'secondary' },
  ],
  List: [
    { propName: 'variant', value: 'unordered' },
    { propName: 'size', value: 'm' },
  ],
  ListItemGroup: [{ propName: 'variant', value: 'inset' }],
  Modal: [
    { propName: 'variant', value: 'contextual' },
    { propName: 'preventClose', value: false },
  ],
  Numeral: [
    { propName: 'as', value: 'p' },
    { propName: 'size', value: 'm' },
    { propName: 'color', value: 'normal' },
  ],
  NotificationInline: [{ propName: 'variant', value: 'info' }],
  NotificationToast: [{ propName: 'variant', value: 'info' }],
  Popover: [{ propName: 'placement', value: 'bottom' }],
  ProgressBar: [{ propName: 'size', value: 'm' }],
  Spinner: [{ propName: 'size', value: 'm' }],
  Toggletip: [
    { propName: 'defaultOpen', value: false },
    { propName: 'placement', value: 'top' },
    { propName: 'offset', value: 12 },
    { propName: 'strategy', value: 'fixed' },
  ],
  Timestamp: [
    { propName: 'variant', value: 'auto' },
    { propName: 'formatStyle', value: 'long' },
    { propName: 'includeTime', value: false },
  ],
  Tooltip: [{ propName: 'placement', value: 'top' }],
};

function getAttributeValue(attribute: TSESTree.JSXAttribute): AttributeValue {
  if (!attribute.value) {
    return true;
  }

  if (
    attribute.value.type === TSESTree.AST_NODE_TYPES.Literal &&
    typeof attribute.value.value !== 'undefined'
  ) {
    return attribute.value.value as StaticValue;
  }

  if (
    attribute.value.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer &&
    attribute.value.expression.type === TSESTree.AST_NODE_TYPES.Literal &&
    typeof attribute.value.expression.value !== 'undefined'
  ) {
    return attribute.value.expression.value as StaticValue;
  }

  return DYNAMIC_VALUE;
}

function getAttributeValues(
  attributes: TSESTree.JSXOpeningElement['attributes'],
): AttributeValues {
  return attributes.reduce((acc, attribute) => {
    if (
      attribute.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
      attribute.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier
    ) {
      return acc;
    }

    acc[attribute.name.name] = getAttributeValue(attribute);
    return acc;
  }, {} as AttributeValues);
}

function getFixRange(
  sourceCode: TSESLint.SourceCode,
  attribute: TSESTree.JSXAttribute,
): [number, number] {
  const source = sourceCode.text;
  let start = attribute.range[0];
  let end = attribute.range[1];

  while ([' ', '\t'].includes(source[end])) {
    end += 1;
  }

  if (source[end] === '\r') {
    end += 1;
  }

  if (source[end] === '\n') {
    end += 1;

    while ([' ', '\t'].includes(source[end])) {
      end += 1;
    }

    return [start, end];
  }

  if (end > attribute.range[1]) {
    return [start, end];
  }

  while (start > 0 && [' ', '\t'].includes(source[start - 1])) {
    start -= 1;
  }

  return [start, attribute.range[1]];
}

function removeRanges(
  text: string,
  ranges: [number, number][],
  offset: number,
): string {
  const mergedRanges = ranges
    .toSorted((a, b) => a[0] - b[0])
    .reduce(
      (acc, [start, end]) => {
        const previous = acc.at(-1);

        if (!previous || start > previous[1]) {
          acc.push([start, end]);
          return acc;
        }

        previous[1] = Math.max(previous[1], end);
        return acc;
      },
      [] as [number, number][],
    )
    .toSorted((a, b) => b[0] - a[0]);

  return mergedRanges
    .toSorted((a, b) => b[0] - a[0])
    .reduce((acc, [start, end]) => {
      const relativeStart = start - offset;
      const relativeEnd = end - offset;
      return acc.slice(0, relativeStart) + acc.slice(relativeEnd);
    }, text);
}

function getLineIndent(source: string, index: number): string {
  const lineStart = source.lastIndexOf('\n', index - 1) + 1;
  let cursor = lineStart;

  while ([' ', '\t'].includes(source[cursor])) {
    cursor += 1;
  }

  return source.slice(lineStart, cursor);
}

function normalizeOpeningElement(
  text: string,
  sourceCode: TSESLint.SourceCode,
  openingElement: TSESTree.JSXOpeningElement,
): string {
  const openingIndent = getLineIndent(sourceCode.text, openingElement.range[0]);

  return text
    .replace(/ +(?=>)/g, '')
    .replace(/ +\/>/g, ' />')
    .replace(/\n[ \t]*\/>$/, `\n${openingIndent}/>`);
}

export const noDefaultProps = createRule({
  name: 'no-default-props',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [],
    docs: {
      description:
        'Default Circuit UI props should be omitted when they do not change the rendered output',
      recommended: 'off',
    },
    messages: {
      redundant:
        "The {{component}}'s `{{propName}}` prop is redundant because `{{value}}` is the default value.",
    },
  },
  defaultOptions: [],
  create(context) {
    const trackedImports = new Map<string, RuleConfig[]>();

    return {
      ImportDeclaration(node) {
        if (node.source.value !== CIRCUIT_UI_PACKAGE) {
          return;
        }

        node.specifiers.forEach((specifier) => {
          if (specifier.type !== TSESTree.AST_NODE_TYPES.ImportSpecifier) {
            return;
          }

          const importedName =
            specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier
              ? specifier.imported.name
              : specifier.imported.value;
          const componentConfigs = configs[importedName];

          if (!componentConfigs) {
            return;
          }

          trackedImports.set(specifier.local.name, componentConfigs);
        });
      },
      JSXElement(node) {
        if (
          node.openingElement.name.type !==
          TSESTree.AST_NODE_TYPES.JSXIdentifier
        ) {
          return;
        }

        const localName = node.openingElement.name.name;
        const componentConfigs = trackedImports.get(localName);

        if (!componentConfigs) {
          return;
        }

        const attributeValues = getAttributeValues(
          node.openingElement.attributes,
        );
        const component = localName;
        const removableAttributes = node.openingElement.attributes
          .filter(
            (attribute): attribute is TSESTree.JSXAttribute =>
              attribute.type === TSESTree.AST_NODE_TYPES.JSXAttribute &&
              attribute.name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier,
          )
          .filter((attribute) => {
            const config = componentConfigs.find(
              ({ propName }) => propName === attribute.name.name,
            );

            if (!config) {
              return false;
            }

            const attributeValue = getAttributeValue(attribute);

            if (attributeValue !== config.value) {
              return false;
            }

            if (
              config.isSafeToRemove &&
              !config.isSafeToRemove({ attributeValues })
            ) {
              return false;
            }

            return true;
          });

        if (removableAttributes.length === 0) {
          return;
        }

        const fixedOpeningElement = normalizeOpeningElement(
          removeRanges(
            context.sourceCode.getText(node.openingElement),
            removableAttributes.map((attribute) =>
              getFixRange(context.sourceCode, attribute),
            ),
            node.openingElement.range[0],
          ),
          context.sourceCode,
          node.openingElement,
        );

        node.openingElement.attributes.forEach((attribute) => {
          if (
            attribute.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
            attribute.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier
          ) {
            return;
          }

          const config = componentConfigs.find(
            ({ propName }) => propName === attribute.name.name,
          );

          if (!config) {
            return;
          }

          const attributeValue = getAttributeValue(attribute);

          if (attributeValue !== config.value) {
            return;
          }

          if (
            config.isSafeToRemove &&
            !config.isSafeToRemove({ attributeValues })
          ) {
            return;
          }

          context.report({
            node: attribute,
            messageId: 'redundant',
            data: {
              component,
              propName: config.propName,
              value: String(config.value),
            },
            fix(fixer) {
              return fixer.replaceText(
                node.openingElement,
                fixedOpeningElement,
              );
            },
          });
        });
      },
    };
  },
});
