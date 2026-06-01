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

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import type { RuleDocs } from '../utils/meta.js';
import { transformAttributeValueToChildren } from '../utils/jsx.js';

const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type Direction = 'top' | 'right' | 'bottom' | 'left';
type Size =
  | 'bit'
  | 'byte'
  | 'kilo'
  | 'mega'
  | 'giga'
  | 'tera'
  | 'peta'
  | 'exa'
  | 'zetta';

type SpacingObject = Partial<Record<Direction, Size>>;

/*
const allDirectionsRegex =
  /^spacing\('(?:bit|byte|kilo|mega|giga|tera|peta|exa|zetta)'\)$/;
*/

function testAllDirectionRegex(spacingAlias: string, text: string): boolean {
  const allDirectionsRegex = new RegExp(
    `^${spacingAlias}\\('(?<size>bit|byte|kilo|mega|giga|tera|peta|exa|zetta)'\\)$`,
  );
  return allDirectionsRegex.test(text);
}
const directionObjectRegex =
  /^spacing\(\{\s*(?:(?:top|right|bottom|left):\s*'(?:bit|byte|kilo|mega|giga|tera|peta|exa|zetta)'\s*,\s*){0,3}(?:top|right|bottom|left):\s*'(?:bit|byte|kilo|mega|giga|tera|peta|exa|zetta)'\s*\}\)$/;

const spacingPairRegex =
  /(?<property>top|right|bottom|left):\s*'(?<value>bit|byte|kilo|mega|giga|tera|peta|exa|zetta)'/g;

function isSpacingMixinCall(
  expression: TSESTree.Expression,
  spacingImportNames: Set<string>,
): expression is TSESTree.CallExpression {
  return (
    expression.type === TSESTree.AST_NODE_TYPES.CallExpression &&
    expression.callee.type === TSESTree.AST_NODE_TYPES.Identifier &&
    spacingImportNames.has(expression.callee.name)
  );
}

function capitalize(value: string): string {
  return value ? value[0].toUpperCase() + value.slice(1) : value;
}

function mapValueToUtilClassName(size: string, direction?: string): string {
  if (direction) {
    return `margin${capitalize(direction)}${capitalize(size)}`;
  }
  return `margin${capitalize(size)}`;
}

function parseSpacingObject(raw: string): SpacingObject {
  if (!directionObjectRegex.test(raw)) {
    return {};
  }

  const result: SpacingObject = {};

  for (const match of raw.matchAll(spacingPairRegex)) {
    const property = match[1] as Direction;
    const value = match[2] as Size;

    if (property in result) {
      return {};
    }

    result[property] = value;
  }

  return result;
}

export const noDeprecatedSpacingsMixin = createRule({
  name: 'no-deprecated-spacing-mixin',
  meta: {
    type: 'suggestion',
    schema: [],
    fixable: 'code',
    docs: {
      description:
        'Deprecated spacing mixins should be replaced with equivaled utility class names from utilClasses',
      recommended: 'warn',
    },
    messages: {
      deprecated:
        'The spacing mixin has been deprecated. Use the utility class names from utilClasses instead.',
    },
  },
  defaultOptions: [],

  create(context) {
    const spacingImportNames = new Set<string>();
    return {
      ImportDeclaration(node) {
        if (node.source.value !== '@sumup-oss/circuit-ui/legacy') {
          return;
        }

        node.specifiers.forEach((specifier) => {
          if (
            specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier &&
            specifier.imported.name === 'spacing'
          ) {
            spacingImportNames.add(specifier.local.name);
          }
        });
      },
      'JSXElement[openingElement.name.type="JSXIdentifier"]': (
        node: TSESTree.JSXElement,
      ) => {
        // check for imports of the mixin

        const existingClassNameAttribute = node.openingElement.attributes.find(
          (attr): attr is TSESTree.JSXAttribute =>
            attr.type === TSESTree.AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === 'className',
        );
        let className: string;

        if (existingClassNameAttribute?.value) {
          if (
            existingClassNameAttribute.value.type ===
            TSESTree.AST_NODE_TYPES.JSXExpressionContainer
          ) {
            className = context.sourceCode.getText(
              existingClassNameAttribute?.value?.expression,
            );
          }
          if (
            existingClassNameAttribute.value?.type ===
            TSESTree.AST_NODE_TYPES.Literal
          ) {
            className = existingClassNameAttribute.value.raw;
          }
        }

        node.openingElement.attributes.forEach((attribute) => {
          if (
            attribute.type !== TSESTree.AST_NODE_TYPES.JSXAttribute ||
            attribute.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier
          ) {
            return;
          }

          const attributeName = attribute.name.name;

          if (
            attributeName !== 'css' ||
            !attribute.value ||
            attribute.value?.type !==
              TSESTree.AST_NODE_TYPES.JSXExpressionContainer ||
            attribute.value.expression.type ===
              TSESTree.AST_NODE_TYPES.JSXEmptyExpression
          ) {
            return;
          }

          if (
            attribute.value.type ===
            TSESTree.AST_NODE_TYPES.JSXExpressionContainer
          ) {
            const expression = transformAttributeValueToChildren(
              context.sourceCode,
              attribute,
            );
            if (!expression) {
              return;
            }

            if (
              !isSpacingMixinCall(
                attribute.value.expression,
                spacingImportNames,
              )
            ) {
              return;
            }

            const raw = expression.slice(1, -1);

            if (directionObjectRegex.test(raw)) {
              const values = Object.entries(parseSpacingObject(raw));

              if (values.length === 1) {
                const [property, value] = values[0];
                className = `utilClasses.${mapValueToUtilClassName(value, property)}`;
              } else {
                className = values.reduce((reducerClassName, [key, value]) => {
                  const directionClass = `utilClasses.${mapValueToUtilClassName(value, key)}`;

                  return reducerClassName
                    ? `${reducerClassName}, ${directionClass}`
                    : directionClass;
                }, className);
                className = `clsx(${className})`;
              }
            }
            if (testAllDirectionRegex(Array.from(spacingImportNames)[0], raw)) {
              const value: string = raw.split("'")[1].split("'")[0];
              className = `utilClasses.${mapValueToUtilClassName(value)}`;
            }
          }

          context.report({
            node: attribute,
            messageId: 'deprecated',
            data: { mixin: 'spacing', name: attributeName },
            fix(fixer) {
              const fixes = [];
              fixes.push(
                fixer.insertTextBeforeRange(
                  [0, 0],
                  "import { utilClasses } from '@sumup-oss/circuit-ui';",
                ),
              );
              if (existingClassNameAttribute) {
                fixes.push(
                  fixer.replaceText(
                    existingClassNameAttribute,
                    `className={${className}}`,
                  ),
                );
                fixes.push(fixer.replaceText(attribute, ''));
              } else {
                fixes.push(
                  fixer.replaceText(attribute, `className={${className}}`),
                );
              }
              return fixes;
            },
          });
        });
      },
    };
  },
});
