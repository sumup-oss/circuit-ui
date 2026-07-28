import circuitUI from '@sumup-oss/eslint-plugin-circuit-ui';
import { configs, defineConfig, files } from '@sumup-oss/foundry/eslint';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
import vitest from '@vitest/eslint-plugin';

// TODO: Re-add react-server-components plugin once it supports ESLint v9

export default defineConfig([
  configs.ignores,
  {
    ignores: ['scripts/generate-skills.js'],
  },
  {
    extends: [configs.typescript],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [...files.javascript, ...files.typescript],
    extends: [
      react.configs.flat.recommended,
      circuitUI.configs.recommended,
      configs.react,
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['autofocus', 'css'] }],

      'circuit-ui/no-invalid-custom-properties': 'error',
      'circuit-ui/no-deprecated-custom-properties': 'error',
      'circuit-ui/no-deprecated-props': 'error',
      'circuit-ui/no-renamed-props': 'error',
      'circuit-ui/prefer-custom-properties': 'warn',
      'circuit-ui/no-deprecated-icons': 'warn',
    },
  },
  configs.browser,
  {
    extends: [
      testingLibrary.configs['flat/react'],
      vitest.configs.recommended,
      configs.tests,
    ],
    rules: {
      'testing-library/no-container': 'warn',
    },
  },
  {
    extends: [storybook.configs['flat/recommended'], configs.storybook],
  },
  {
    files: [...files.storybook, ...files.tests],
    rules: {
      'import-x/no-relative-packages': 'off',
      'react-server-components/use-client': 'off',
    },
  },
  {
    // Badge's own files still make use of its deprecated `variant`/`circle`
    // for test and demonstration purposes.
    files: ['packages/circuit-ui/components/Badge/**'],
    rules: {
      'circuit-ui/no-renamed-props': 'off',
    },
  },
  {
    // TODO: SecondaryLinks forwards its public `badge` prop, which is still
    // typed as `BadgeProps`, directly onto a `Badge` element. Migrating
    // this to `Status` requires a breaking change to that public prop's type
    files: [
      'packages/circuit-ui/components/SideNavigation/components/SecondaryLinks/SecondaryLinks.tsx',
    ],
    rules: {
      'circuit-ui/no-renamed-props': 'off',
    },
  },
  {
    files: ['packages/icons/scripts/*'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      'n/no-unpublished-require': 'off',
    },
  },
  {
    files: ['templates/**/*'],
    rules: {
      'notice/notice': 'off',
    },
  },
]);
