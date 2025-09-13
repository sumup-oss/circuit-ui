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

import stylelint, { type Rule } from 'stylelint';
import { schema } from '@sumup-oss/design-tokens';

const DEPRECATED_CUSTOM_PROPERTIES = schema.filter(({ deprecation }) =>
  Boolean(deprecation),
);
const REGEX_STRING = DEPRECATED_CUSTOM_PROPERTIES.map(({ name }) => name).join(
  '|',
);

export const ruleName = 'circuit-ui/no-deprecated-custom-properties';

const meta = {
  url: 'https://github.com/sumup-oss/circuit-ui/tree/main/packages/stylelint-plugin-circuit-ui/no-deprecated-custom-properties/README.md',
  fixable: true,
};

export const messages = stylelint.utils.ruleMessages(ruleName, {
  deprecated: (name: string, replacement: string) =>
    `The \`${name}\` custom property has been deprecated. Use the \`${replacement}\` custom property instead.`,
});

const rule: Rule = (enabled, _options, context) => (root, result) => {
  if (!enabled || DEPRECATED_CUSTOM_PROPERTIES.length === 0) {
    return;
  }

  root.walkDecls((decl) => {
    const regex = new RegExp(REGEX_STRING, 'g');
    let match: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: This is fine
    while ((match = regex.exec(decl.value)) !== null) {
      const name = match[0];
      // biome-ignore lint/style/noNonNullAssertion: Each item is guaranteed to have a deprecation.
      const { replacement } = DEPRECATED_CUSTOM_PROPERTIES.find(
        (token) => token.name === name,
      )!.deprecation!;

      if (context?.fix) {
        decl.value = decl.value.replace(name, replacement);
      }

      stylelint.utils.report({
        message: messages.deprecated(name, replacement),
        node: decl,
        result,
        ruleName,
      });
    }
  });
};

rule.ruleName = ruleName;
rule.meta = meta;
rule.messages = messages;

export const noDeprecatedCustomProperties = stylelint.createPlugin(
  ruleName,
  rule,
);
