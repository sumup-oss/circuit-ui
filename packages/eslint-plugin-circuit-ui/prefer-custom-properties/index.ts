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
import { schema } from '@sumup/design-tokens';

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

export const preferCustomProperties = createRule({
  name: 'prefer-custom-properties',
  meta: {
    type: 'suggestion',
    schema: [],
    fixable: 'code',
    docs: {
      description:
        'Custom properties prefixed with `--cui-` should be valid Circuit UI design tokens.',
      recommended: 'recommended',
    },
    messages: {
      replace:
        "Use CSS custom properties instead of the Emotion.js theme. Replace '{{jsToken}}' with '{{cssVariable}}'.",
      refactor: 'Use CSS custom properties instead of the Emotion.js theme.',
    },
  },
  defaultOptions: [],
  create(context) {
    function transformCamelToKebabCase(string: string) {
      return string.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    }

    function createCSSCustomProperty(segments: string[]): `--cui-${string}` {
      const name = segments.map(transformCamelToKebabCase).join('-');
      return `--cui-${name}`;
    }

    function isValidCustomProperty(customProperty: string) {
      return schema.findIndex((token) => token.name === customProperty) !== -1;
    }

    function reportColorToken(node: TSESTree.Node, identifiers: string[]) {
      if (identifiers[1] === 'colors' && identifiers.length === 3) {
        context.report({
          node,
          messageId: 'refactor',
        });
      }
    }

    function flattenMemberExpression(
      expression: TSESTree.Expression,
      identifiers: string[] = [],
      computed = false,
    ): { identifiers: string[]; computed: boolean } {
      if (expression.type === 'MemberExpression') {
        return flattenMemberExpression(
          expression.object,
          expression.property.type === 'Identifier'
            ? [expression.property.name, ...identifiers]
            : identifiers,
          computed || expression.computed,
        );
      }

      if (expression.type !== 'Identifier') {
        return { identifiers, computed: true };
      }

      return { identifiers: [expression.name, ...identifiers], computed };
    }

    function checkTaggedTemplateExpression(
      node: TSESTree.TaggedTemplateExpression,
    ) {
      const { quasi } = node;

      quasi.expressions.forEach((expression) => {
        const { identifiers, computed } = flattenMemberExpression(expression);

        const [theme, ...rest] = identifiers;

        // Ignore template literals that don't reference the `theme`
        if (theme !== 'theme') {
          return;
        }

        // Computed expressions cannot be auto-fixed.
        if (computed) {
          context.report({
            node: expression,
            messageId: 'refactor',
          });
          return;
        }

        const customProperty = createCSSCustomProperty(rest);

        if (!isValidCustomProperty(customProperty)) {
          reportColorToken(expression, identifiers);
          return;
        }

        const jsToken = `\${${identifiers.join('.')}}`;
        const cssVariable = `var(${customProperty})`;

        const text = context
          .getSourceCode()
          .getText(node)
          .replace(jsToken, cssVariable);

        context.report({
          node: expression,
          messageId: 'replace',
          data: { jsToken, cssVariable },
          fix(fixer) {
            return fixer.replaceText(node, text);
          },
        });
      });
    }

    function checkMemberExpression(node: TSESTree.MemberExpression) {
      if (node.parent?.type === 'TemplateLiteral') {
        return;
      }

      const { identifiers, computed } = flattenMemberExpression(node);

      const [theme, ...rest] = identifiers;

      // Ignore template literals that don't reference the `theme`
      if (theme !== 'theme') {
        return;
      }

      // Computed expressions cannot be auto-fixed.
      if (computed || node.parent?.type === 'BinaryExpression') {
        context.report({
          node,
          messageId: 'refactor',
        });
        return;
      }

      const customProperty = createCSSCustomProperty(rest);

      if (!isValidCustomProperty(customProperty)) {
        reportColorToken(node, identifiers);
        return;
      }

      const jsToken = `\${${identifiers.join('.')}}`;
      const cssVariable = `var(${customProperty})`;

      context.report({
        node,
        messageId: 'replace',
        data: { jsToken, cssVariable },
        fix(fixer) {
          return fixer.replaceText(node, `'${cssVariable}'`);
        },
      });
    }

    return {
      'TaggedTemplateExpression:has(Identifier[name="css"])':
        checkTaggedTemplateExpression,
      'MemberExpression:has(Identifier[name="theme"])': checkMemberExpression,
    };
  },
});
