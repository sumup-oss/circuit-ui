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
      name: 'skips when the icons package is not a declared dependency',
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
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
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
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
      ],
    },
    {
      name: 'matched country flag icon from Circuit UI',
      filename: circuitUiFilename,
      code: `
        import { FlagFr } from '@sumup-oss/icons';
        function Component() {
          return <FlagFr>France</FlagFr>
        }
      `,
      output: `
        import { Flag } from '@sumup-oss/icons';
        function Component() {
          return <Flag countryCode="FR" width="16">France</Flag>
        }
      `,
      errors: [
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
      ],
    },
    {
      name: 'matched locally renamed icon from Circuit UI',
      filename: circuitUiFilename,
      code: `
         import { FlagFr as FrenchFlag } from '@sumup-oss/icons';
         function Component() {
           return <div><FrenchFlag /><FlagFr/></div>
         }
       `,
      output: `
         import { Flag as FrenchFlag } from '@sumup-oss/icons';
         function Component() {
           return <div><FrenchFlag countryCode="FR" width="16" /><FlagFr/></div>
         }
       `,
      errors: [
        {
          messageId: 'deprecatedWithAlternative',
        },
        { messageId: 'deprecatedWithAlternative' },
      ],
    },
    {
      name: 'does not confuse a deprecated icon from Circuit UI with another of the same name from a different package',
      filename: circuitUiFilename,
      code: `
         import { FlagFr as FrenchFlag } from '@sumup-oss/icons';
         import { FlagFr } from 'flags-package';
         function Component() {
           return (<div>
             <FrenchFlag />
             <FlagFr/>
           </div>)
         }
       `,
      output: `
         import { Flag as FrenchFlag } from '@sumup-oss/icons';
         import { FlagFr } from 'flags-package';
         function Component() {
           return (<div>
             <FrenchFlag countryCode="FR" width="16" />
             <FlagFr/>
           </div>)
         }
       `,
      errors: [
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
      ],
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
      errors: [
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
      ],
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
      errors: [
        { messageId: 'deprecatedWithAlternative' },
        { messageId: 'deprecatedWithAlternative' },
      ],
    },
    {
      name: 'matched deprecated icon with multiple alternatives',
      filename: circuitUiFilename,
      code: `
        import { AddItems } from '@sumup-oss/icons';
        function Component() {
          return <AddItems/>
        }
      `,
      errors: [
        {
          messageId: 'deprecatedWithSuggestion',
          suggestions: [
            {
              messageId: 'deprecatedWithSuggestion',
              data: {
                name: 'AddItems',
                alternative: 'Add',
              },
              output: `
        import { Add } from '@sumup-oss/icons';
        function Component() {
          return <AddItems/>
        }
      `,
            },
            {
              messageId: 'deprecatedWithSuggestion',
              data: {
                name: 'AddItems',
                alternative: 'Items',
              },
              output: `
        import { Items } from '@sumup-oss/icons';
        function Component() {
          return <AddItems/>
        }
      `,
            },
          ],
        },
        {
          messageId: 'deprecatedWithAlternative',
          suggestions: [
            {
              messageId: 'deprecatedWithSuggestion',
              data: {
                name: 'AddItems',
                alternative: 'Add',
              },
              output: `
        import { AddItems } from '@sumup-oss/icons';
        function Component() {
          return <Add/>
        }
      `,
            },
            {
              messageId: 'deprecatedWithSuggestion',
              data: {
                name: 'AddItems',
                alternative: 'Items',
              },
              output: `
        import { AddItems } from '@sumup-oss/icons';
        function Component() {
          return <Items/>
        }
      `,
            },
          ],
        },
      ],
    },
    {
      name: 'matched deprecated icon with out direct alternative',
      filename: circuitUiFilename,
      code: `
        import { SumUpLogo } from '@sumup-oss/icons';
        function Component() {
          return <SumUpLogo/>
        }
      `,
      errors: [
        {
          messageId: 'deprecated',
          data: {
            name: 'SumUpLogo',
            deprecation:
              "Use the SumUpLogo component from '@sumup-oss/circuit-ui' instead.",
          },
        },
      ],
    },
  ],
});
