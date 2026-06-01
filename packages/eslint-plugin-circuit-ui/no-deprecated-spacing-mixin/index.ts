import { ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleDocs } from '../utils/meta.js';
import { transformAttributeValueToChildren } from '../utils/jsx.js';

const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type SpacingUsage = {
  node: TSESTree.JSXAttribute;
  existingClassNameAttribute?: TSESTree.JSXAttribute;
  className: string;
};

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

function getImportInsertionIndex(program: TSESTree.Program): number {
  for (let index = program.body.length - 1; index >= 0; index -= 1) {
    const node = program.body[index];

    if (
      node.type === TSESTree.AST_NODE_TYPES.ExpressionStatement &&
      typeof node.directive === 'string'
    ) {
      return node.range[1];
    }
  }

  return 0;
}

function removeLegacySpacingImport(
  fixer: TSESLint.RuleFixer,
  importDeclaration: TSESTree.ImportDeclaration,
  spacingSpecifier: TSESTree.ImportSpecifier,
  sourceCode: Readonly<TSESLint.SourceCode>,
): TSESLint.RuleFix {
  const importSpecifiers = importDeclaration.specifiers.filter(
    (specifier): specifier is TSESTree.ImportSpecifier =>
      specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier,
  );

  if (importSpecifiers.length === 1) {
    return fixer.remove(importDeclaration);
  }

  const tokenAfter = sourceCode.getTokenAfter(spacingSpecifier);
  const tokenBefore = sourceCode.getTokenBefore(spacingSpecifier);

  if (tokenAfter?.value === ',') {
    return fixer.removeRange([spacingSpecifier.range[0], tokenAfter.range[1]]);
  }

  if (tokenBefore?.value === ',') {
    return fixer.removeRange([tokenBefore.range[0], spacingSpecifier.range[1]]);
  }

  return fixer.remove(spacingSpecifier);
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
    const usages: SpacingUsage[] = [];
    let legacySpacingImportDeclaration: TSESTree.ImportDeclaration | null =
      null;
    let legacySpacingSpecifier: TSESTree.ImportSpecifier | null = null;
    return {
      ImportDeclaration(node) {
        if (node.source.value !== '@sumup-oss/circuit-ui/legacy') {
          return;
        }

        const spacingSpecifier = node.specifiers.find(
          (specifier): specifier is TSESTree.ImportSpecifier =>
            specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier &&
            specifier.imported.name === 'spacing',
        );
        if (!spacingSpecifier) {
          return;
        }
        spacingImportNames.add(spacingSpecifier.local.name);
        legacySpacingSpecifier = spacingSpecifier;
        legacySpacingImportDeclaration = node;
      },
      'JSXElement[openingElement.name.type="JSXIdentifier"]': (
        node: TSESTree.JSXElement,
      ) => {
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

          const existingClassNameAttribute =
            node.openingElement.attributes.find(
              (attr): attr is TSESTree.JSXAttribute =>
                attr.type === TSESTree.AST_NODE_TYPES.JSXAttribute &&
                attr.name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier &&
                attr.name.name === 'className',
            );

          if (
            attribute.value.type ===
            TSESTree.AST_NODE_TYPES.JSXExpressionContainer
          ) {
            if (
              !isSpacingMixinCall(
                attribute.value.expression,
                spacingImportNames,
              )
            ) {
              return;
            }

            const expression = transformAttributeValueToChildren(
              context.sourceCode,
              attribute,
            );
            if (!expression) {
              return;
            }

            const raw = expression.slice(1, -1);

            let classNameToAssign: string = '';

            if (existingClassNameAttribute?.value) {
              if (
                existingClassNameAttribute.value.type ===
                TSESTree.AST_NODE_TYPES.JSXExpressionContainer
              ) {
                classNameToAssign = context.sourceCode.getText(
                  existingClassNameAttribute?.value?.expression,
                );
              }
              if (
                existingClassNameAttribute.value?.type ===
                TSESTree.AST_NODE_TYPES.Literal
              ) {
                classNameToAssign = existingClassNameAttribute.value.raw;
              }
            }

            if (directionObjectRegex.test(raw)) {
              const values = Object.entries(parseSpacingObject(raw));

              if (values.length === 1) {
                const [property, value] = values[0];
                classNameToAssign = `utilClasses.${mapValueToUtilClassName(value, property)}`;
                usages.push({
                  node: attribute,
                  existingClassNameAttribute,
                  className: classNameToAssign,
                });
              } else {
                classNameToAssign = values.reduce(
                  (reducerClassName, [key, value]) => {
                    const directionClass = `utilClasses.${mapValueToUtilClassName(value, key)}`;

                    return reducerClassName
                      ? `${reducerClassName}, ${directionClass}`
                      : directionClass;
                  },
                  classNameToAssign,
                );
                classNameToAssign = `clsx(${classNameToAssign})`;
                usages.push({
                  node: attribute,
                  existingClassNameAttribute,
                  className: classNameToAssign,
                });
              }
            }
            if (testAllDirectionRegex(Array.from(spacingImportNames)[0], raw)) {
              const value: string = raw.split("'")[1].split("'")[0];
              classNameToAssign = `utilClasses.${mapValueToUtilClassName(value)}`;
              usages.push({
                node: attribute,
                existingClassNameAttribute,
                className: classNameToAssign,
              });
            }
          }
        });
      },
      'Program:exit'(program: TSESTree.Program) {
        if (usages.length === 0) {
          return;
        }

        context.report({
          node: usages[0].node,
          messageId: 'deprecated',
          fix(fixer) {
            const fixes: TSESLint.RuleFix[] = [];

            const importInsertionIndex = getImportInsertionIndex(program);

            fixes.push(
              fixer.insertTextAfterRange(
                [importInsertionIndex, importInsertionIndex],
                `${importInsertionIndex === 0 ? '' : '\n'}import { utilClasses } from '@sumup-oss/circuit-ui';`,
              ),
            );

            usages.forEach((usage) => {
              if (usage.existingClassNameAttribute) {
                fixes.push(
                  fixer.replaceText(
                    usage.existingClassNameAttribute,
                    `className={${usage.className}}`,
                  ),
                );

                fixes.push(fixer.remove(usage.node));
              } else {
                fixes.push(
                  fixer.replaceText(
                    usage.node,
                    `className={${usage.className}}`,
                  ),
                );
              }
            });

            if (legacySpacingImportDeclaration && legacySpacingSpecifier) {
              fixes.push(
                removeLegacySpacingImport(
                  fixer,
                  legacySpacingImportDeclaration,
                  legacySpacingSpecifier,
                  context.sourceCode,
                ),
              );
            }

            return fixes;
          },
        });
      },
    };
  },
});
