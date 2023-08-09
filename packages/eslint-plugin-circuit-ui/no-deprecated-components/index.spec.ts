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

// We disable the rule in this file because we explicitly test invalid cases
/* eslint-disable @sumup/circuit-ui/no-invalid-custom-properties */

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDeprecatedComponents } from '.';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-deprecated-components', noDeprecatedComponents, {
  valid: [
    {
      name: 'similar component from Circuit UI',
      code: `
        import { RadioButtonGroup } from '@sumup/circuit-ui';
      `,
    },
    {
      name: 'matched component from different package',
      code: `
        import { RadioButton } from 'material-ui';
      `,
    },
  ],
  invalid: [
    {
      name: 'matched component from Circuit UI',
      code: `
        import { RadioButton } from '@sumup/circuit-ui';
      `,
      errors: [{ messageId: 'deprecated' }],
    },
  ],
});
