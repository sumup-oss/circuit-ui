// We disable the rule in this file because we explicitly test invalid cases

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDeprecatedIcons } from './index.js';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const circuitUiFilename = path.join(
  testDir,
  '../../circuit-ui/src/example.tsx',
);
const stylelintPluginFilename = path.join(
  testDir,
  '../../stylelint-plugin-circuit-ui/src/example.tsx',
);

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-deprecated-icons', noDeprecatedIcons, {
  valid: [
    {
      name: 'Non deprecated icon from Circuit UI',
      filename: circuitUiFilename,
      code: `
        import { Add } from '@sumup-oss/icons';
      `,
    },
    {
      name: 'matched icon name from different package',
      filename: circuitUiFilename,
      code: `
        import { Copy } from 'material-ui';
      `,
    },
    {
      name: 'skips when icons is not a declared dependency',
      filename: stylelintPluginFilename,
      code: `
        import { Copy } from '@sumup-oss/icons';
      `,
    },
  ],
  invalid: [
    {
      name: 'matched multiple deprecated icons from Circuit UI',
      filename: circuitUiFilename,
      code: `
        import { Copy, EmailChat, Home } from '@sumup-oss/icons';
        function Component() {
          return (<>
          <Copy />
          <EmailChat/>
          </>)
        }
      `,
      output: `
        import { CopyPaste, Email, Home } from '@sumup-oss/icons';
        function Component() {
          return (<>
          <CopyPaste />
          <Email/>
          </>)
        }
      `,
      errors: [
        { messageId: 'deprecated' },
        { messageId: 'deprecated' },
        { messageId: 'deprecated' },
        { messageId: 'deprecated' },
      ],
    },
    {
      name: 'matched multiple deprecated icons from Circuit UI in different import statements',
      filename: circuitUiFilename,
      code: `
        import { Copy, Home } from '@sumup-oss/icons';
        import { EmailChat } from '@sumup-oss/icons';
        function Component() {
          return (<>
          <Copy />
          <EmailChat/>
          </>)
        }
      `,
      output: `
        import { CopyPaste, Home } from '@sumup-oss/icons';
        import { Email } from '@sumup-oss/icons';
        function Component() {
          return (<>
          <CopyPaste />
          <Email/>
          </>)
        }
      `,
      errors: [
        { messageId: 'deprecated' },
        { messageId: 'deprecated' },
        { messageId: 'deprecated' },
        { messageId: 'deprecated' },
      ],
    },
    {
      name: 'matched country flag icon from Circuit UI',
      filename: circuitUiFilename,
      code: `
        import { FlagFr } from '@sumup-oss/icons';
        function Component() {
          return <FlagFr />
        }
      `,
      output: `
        import { Flag } from '@sumup-oss/icons';
        function Component() {
          return <Flag countryCode="FR" width="16" />
        }
      `,
      errors: [{ messageId: 'deprecated' }, { messageId: 'deprecated' }],
    },
    {
      name: 'matched locally renamed icon from Circuit UI',
      filename: circuitUiFilename,
      code: `
         import { FlagFr as FrenchFlag } from '@sumup-oss/icons';
         function Component() {
           return <FrenchFlag />
         }
       `,
      output: `
         import { Flag as FrenchFlag } from '@sumup-oss/icons';
         function Component() {
           return <FrenchFlag countryCode="FR" width="16" />
         }
       `,
      errors: [{ messageId: 'deprecated' }, { messageId: 'deprecated' }],
    },
    {
      name: 'matched deprecated icon in object expression',
      filename: circuitUiFilename,
      code: `
        import { Copy } from '@sumup-oss/icons';
        const myObject = {
          name: 'home',
          icon: Copy,
        };
      `,
      output: `
        import { CopyPaste } from '@sumup-oss/icons';
        const myObject = {
          name: 'home',
          icon: CopyPaste,
        };
      `,
      errors: [{ messageId: 'deprecated' }, { messageId: 'deprecated' }],
    },
    {
      name: 'matched renamed deprecated icon in object expression',
      filename: circuitUiFilename,
      code: `
        import { Copy as CopyIcon } from '@sumup-oss/icons';
        const myObject = {
          name: 'home',
          icon: CopyIcon,
        };
      `,
      output: `
        import { CopyPaste as CopyIcon } from '@sumup-oss/icons';
        const myObject = {
          name: 'home',
          icon: CopyIcon,
        };
      `,
      errors: [{ messageId: 'deprecated' }, { messageId: 'deprecated' }],
    },
  ],
});
