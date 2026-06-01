import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDeprecatedSpacingsMixin } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-deprecated-spacing-mixin', noDeprecatedSpacingsMixin, {
  valid: [
    {
      name: 'matched component without the deprecated css attribute',
      code: `
        function Component() {
          return <Body />
        }
      `,
    },
    {
      name: 'matched div without the deprecated css attribute',
      code: `
        function Component() {
          return <div />
        }
      `,
    },
    {
      name: 'matched component without the deprecated css mixin',
      code: `
        function Component() {
          return <Anchor css={{ marginTop: 'var(--cui-spacings-giga)'}} />
        }
      `,
    },
    {
      name: 'matched the spacing mixin name but from different packages',
      code: `
        import { spacing } from 'some-package';
        function Component() {
          return <Anchor css={spacing('foo')} />
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'matched a div element with the deprecated all spacing mixin',
      code: `
        import { spacing } from '@sumup-oss/circuit-ui/legacy';
        function Component() {
          return <div css={spacing('giga')} />
        }
      `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
        
        function Component() {
          return <div className={utilClasses.marginGiga} />
        }
      `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched a div element with the deprecated all spacing mixin with a name alias',
      code: `
        import {spacing as legacySpacing, foo } from '@sumup-oss/circuit-ui/legacy';
        function Component() {
          return <div css={legacySpacing('giga')} />
        }
      `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
        import { foo } from '@sumup-oss/circuit-ui/legacy';
        function Component() {
          return <div className={utilClasses.marginGiga} />
        }
      `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched component with the deprecated all spacing mixin',
      code: `
        import { spacing } from '@sumup-oss/circuit-ui/legacy';
        function Component() {
          return <Body css={spacing('giga')}/>
        }
      `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
        
        function Component() {
          return <Body className={utilClasses.marginGiga}/>
        }
      `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched component with the deprecated spacing mixin with a specific direction',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          function Component() {
            return <Body css={spacing({left: 'mega'})} />
          }
        `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
          
          function Component() {
            return <Body className={utilClasses.marginLeftMega} />
          }
        `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched component with the deprecated spacing mixin and multiple directions',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          function Component() {
            return <Anchor css={spacing({left: 'mega', top: 'kilo'})} />
          }
        `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
          
          function Component() {
            return <Anchor className={clsx(utilClasses.marginLeftMega, utilClasses.marginTopKilo)} />
          }
        `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched component with the deprecated combined spacing mixins and a another className (literal)',
      code: `
         import { spacing } from '@sumup-oss/circuit-ui/legacy';
         function Component() {
           return <Body className="title" css={spacing({left: 'mega', top: 'kilo'})} />
         }
       `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
         
         function Component() {
           return <Body className={clsx("title", utilClasses.marginLeftMega, utilClasses.marginTopKilo)}  />
         }
       `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched component with the deprecated combined spacing mixins and a another className (expression)',
      code: `
         import { spacing } from '@sumup-oss/circuit-ui/legacy';
         import styles from './styles.module.css';
         function Component() {
           return <Body className={styles.title} css={spacing({left: 'mega', top: 'kilo'})} />
         }
       `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
         
         import styles from './styles.module.css';
         function Component() {
           return <Body className={clsx(styles.title, utilClasses.marginLeftMega, utilClasses.marginTopKilo)}  />
         }
       `,
      errors: [{ messageId: 'deprecated' }],
    },
  ],
});
