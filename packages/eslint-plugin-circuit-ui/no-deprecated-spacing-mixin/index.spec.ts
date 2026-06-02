import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDeprecatedSpacingMixin } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-deprecated-spacing-mixin', noDeprecatedSpacingMixin, {
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
    {
      name: 'do nothing if value is 0',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          function Component() {
            return <Anchor css={spacing(0)} />
          }
        `,
    },
    {
      name: 'do nothing if values is auto',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          function Component() {
            return <Anchor css={spacing({left: 'auto', top: 'auto'})} />
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
      name: 'matched component with the deprecated spacing mixin with a specific direction and an existing className',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          import styles from './styles.module.css';
          function Component() {
            return <Body className={styles.title} css={spacing({left: 'mega'})} />
          }
        `,
      output: `import { utilClasses, clsx } from '@sumup-oss/circuit-ui';
          
          import styles from './styles.module.css';
          function Component() {
            return <Body className={clsx(styles.title, utilClasses.marginLeftMega)}  />
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
      output: `import { utilClasses, clsx } from '@sumup-oss/circuit-ui';
          
          function Component() {
            return <Anchor className={clsx(utilClasses.marginLeftMega, utilClasses.marginTopKilo)} />
          }
        `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'does not import clsx if already imported',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          import { clsx } from '@sumup-oss/circuit-ui';
          
          function Component() {
            return <Anchor css={spacing({left: 'mega', top: 'kilo'})} />
          }
        `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
          
          import { clsx } from '@sumup-oss/circuit-ui';
          
          function Component() {
            return <Anchor className={clsx(utilClasses.marginLeftMega, utilClasses.marginTopKilo)} />
          }
        `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched component with the deprecated spacing mixin and multiple directions split on multiple lines',
      code: `
          import { spacing } from '@sumup-oss/circuit-ui/legacy';
          function Component() {
            return <Anchor css={spacing({left: 'mega',
             top: 'kilo',
             bottom: 'bit',
             right: 'exa'})} />
          }
        `,
      output: `import { utilClasses, clsx } from '@sumup-oss/circuit-ui';
          
          function Component() {
            return <Anchor className={clsx(utilClasses.marginLeftMega, utilClasses.marginTopKilo, utilClasses.marginBottomBit, utilClasses.marginRightExa)} />
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
      output: `import { utilClasses, clsx } from '@sumup-oss/circuit-ui';
         
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
      output: `import { utilClasses, clsx } from '@sumup-oss/circuit-ui';
         
         import styles from './styles.module.css';
         function Component() {
           return <Body className={clsx(styles.title, utilClasses.marginLeftMega, utilClasses.marginTopKilo)}  />
         }
       `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'matched several components with the deprecated spacing mixins',
      code: `
         import { spacing } from '@sumup-oss/circuit-ui/legacy';
         
         const NotifyIcon = <StyledNotify size="16" css={spacing({ right: 'bit' })} />;
         const AlertIcon = <StyledAlert size="16" css={spacing({ left: 'zetta' })} />;
         const ConfirmIcon = <StyledConfirm size="16" css={spacing({ bottom: 'exa' })} />;
         const TimeIcon = <StyledTime css={spacing({ top: 'peta' })} />;
       `,
      output: `import { utilClasses } from '@sumup-oss/circuit-ui';
         
         
         const NotifyIcon = <StyledNotify size="16" className={utilClasses.marginRightBit} />;
         const AlertIcon = <StyledAlert size="16" className={utilClasses.marginLeftZetta} />;
         const ConfirmIcon = <StyledConfirm size="16" className={utilClasses.marginBottomExa} />;
         const TimeIcon = <StyledTime className={utilClasses.marginTopPeta} />;
       `,
      errors: [{ messageId: 'deprecated' }],
    },
  ],
});
