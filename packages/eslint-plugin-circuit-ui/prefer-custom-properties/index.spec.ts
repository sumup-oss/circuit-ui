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

import { ESLintUtils } from '@typescript-eslint/utils';

import { preferCustomProperties } from '.';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('prefer-custom-properties', preferCustomProperties, {
  valid: [
    {
      name: 'tagged template expression that does not reference the `theme`',
      code: `
        const styles = ({ padding }) => css\`
          padding: \${padding};
        \`;
      `,
    },
    {
      name: 'tagged template expression that is not passed to `css`',
      code: `
        const message = log\`Current theme: \${theme.type}\`;
      `,
    },
    {
      name: 'tagged template expression that uses an unsupported `theme` property',
      code: `
        const styles = (theme) => css\`
          \${theme.mq.kilo} {
            display: flex;
          }
        \`;
      `,
    },
  ],
  invalid: [
    {
      name: 'tagged template expression that references the `theme` once',
      code: `
        const styles = (theme) => css\`
          padding: \${theme.spacings.kilo};
        \`;
      `,
      output: `
        const styles = (theme) => css\`
          padding: var(--cui-spacings-kilo);
        \`;
      `,
      errors: [{ messageId: 'replace' }],
    },
    {
      name: 'tagged template expression that references the `theme` on multiple lines',
      code: `
        const styles = (theme) => css\`
          padding: \${theme.spacings.kilo};
          margin: \${theme.spacings.kilo};
        \`;
      `,
      // The second occurrence would be auto-fixed on the second pass.
      output: `
        const styles = (theme) => css\`
          padding: var(--cui-spacings-kilo);
          margin: \${theme.spacings.kilo};
        \`;
      `,
      errors: [{ messageId: 'replace' }, { messageId: 'replace' }],
    },
    {
      name: 'tagged template expression that references the `theme` multiple times inline',
      code: `
        const styles = (theme) => css\`
          padding: \${theme.spacings.kilo} \${theme.spacings.kilo};
        \`;
      `,
      // The second occurrence would be auto-fixed on the second pass.
      output: `
        const styles = (theme) => css\`
          padding: var(--cui-spacings-kilo) \${theme.spacings.kilo};
        \`;
      `,
      errors: [{ messageId: 'replace' }, { messageId: 'replace' }],
    },
    {
      name: 'tagged template expression that computes the `theme` property dynamically',
      code: `
        const styles = ({ theme, size }) => css\`
          padding: \${theme.spacings[size]};
        \`;
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'tagged template expression that references a color token',
      code: `
        const styles = (theme) => css\`
          color: \${theme.colors.p500};
        \`;
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'tagged template expression with conditional `theme` properties',
      code: `
        const styles = ({ theme, large }) => css\`
          padding: \${large ? theme.spacings.exa : theme.spacings.peta};
        \`;
      `,
      output: `
        const styles = ({ theme, large }) => css\`
          padding: \${large ? 'var(--cui-spacings-exa)' : 'var(--cui-spacings-peta)'};
        \`;
      `,
      errors: [{ messageId: 'replace' }, { messageId: 'replace' }],
    },
    {
      name: 'tagged template expression with destructured `theme` property',
      code: `
        const Box = styled.div\`
          padding: \${({ theme }) => theme.spacings.peta};
        \`;
      `,
      output: `
        const Box = styled.div\`
          padding: \${({ theme }) => 'var(--cui-spacings-peta)'};
        \`;
      `,
      errors: [{ messageId: 'replace' }],
    },
    {
      name: 'member expression',
      code: `
        const borderRadius = theme.borderRadius.kilo;
      `,
      output: `
        const borderRadius = 'var(--cui-border-radius-kilo)';
      `,
      errors: [{ messageId: 'replace' }],
    },
  ],
});
