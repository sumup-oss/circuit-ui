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

import { TSESTree, type TSESLint } from '@typescript-eslint/utils';

export function findAttribute(
  node: TSESTree.JSXElement,
  attributeName: string,
) {
  return node.openingElement.attributes.find(
    (attribute) =>
      attribute.type === TSESTree.AST_NODE_TYPES.JSXAttribute &&
      attribute.name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier &&
      attribute.name.name === attributeName,
  ) as TSESTree.JSXAttribute | undefined;
}

export function getAttributeValue(
  attribute: TSESTree.JSXAttribute,
): string | null {
  if (
    attribute.value?.type === TSESTree.AST_NODE_TYPES.Literal &&
    typeof attribute.value.value === 'string'
  ) {
    return attribute.value.value;
  }
  if (
    attribute.value?.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer &&
    attribute.value.expression.type === TSESTree.AST_NODE_TYPES.Literal
  ) {
    return attribute.value.expression.value as string;
  }
  return null;
}

export function filterWhitespaceChildren(
  children: TSESTree.JSXChild[],
): TSESTree.JSXChild[] {
  return children.filter((child) => {
    if (child.type !== TSESTree.AST_NODE_TYPES.JSXText) {
      return true;
    }
    const nonWhiteSpaceText = child.value.trim();
    return Boolean(nonWhiteSpaceText);
  });
}

export function transformAttributeValueToChildren(
  sourceCode: TSESLint.SourceCode,
  attribute: TSESTree.JSXAttribute,
): string | null {
  if (!attribute.value) {
    return null;
  }
  switch (attribute.value.type) {
    case TSESTree.AST_NODE_TYPES.Literal:
      return sourceCode
        .getText(attribute.value)
        .replace(/^"/, '')
        .replace(/"$/, '');
    case TSESTree.AST_NODE_TYPES.JSXExpressionContainer:
      switch (attribute.value.expression.type) {
        case TSESTree.AST_NODE_TYPES.JSXElement:
          return sourceCode.getText(attribute.value.expression);
        default:
          return sourceCode.getText(attribute.value);
      }
    default:
      return null;
  }
}
