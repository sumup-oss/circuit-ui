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

const PREFIX = '--cui-';
const VALID_CUSTOM_PROPERTIES_WITHOUT_PREFIX = schema.map(({ name }) =>
  name.replace(PREFIX, ''),
);
const REGEX_STRING = `(?:${PREFIX})(?!(?:${VALID_CUSTOM_PROPERTIES_WITHOUT_PREFIX.join(
  '|',
)})[^\\w-])[\\w-]+`;

export const ruleName = 'circuit-ui/no-invalid-custom-properties';

const meta = {
  url: 'https://github.com/sumup-oss/circuit-ui/tree/main/packages/stylelint-plugin-circuit-ui/no-invalid-custom-properties/README.md',
};

export const messages = stylelint.utils.ruleMessages(ruleName, {
  invalid: (name: string) =>
    `"${name}" is not a valid Circuit UI design token.`,
});

const rule: Rule = (enabled) => (root, result) => {
  if (!enabled) {
    return;
  }

  root.walkDecls((decl) => {
    const match = new RegExp(REGEX_STRING, 'g').exec(decl.value);

    if (match) {
      stylelint.utils.report({
        message: messages.invalid(match[0]),
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

export const noInvalidCustomProperties = stylelint.createPlugin(ruleName, rule);
