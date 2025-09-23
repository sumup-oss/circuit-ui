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
    extends: [configs.typescript],
    languageOptions: {
      parserOptions: {
        project: ['./packages/*/tsconfig.json', './tsconfig.json'],
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
      'circuit-ui/no-invalid-custom-properties': 'error',
      'circuit-ui/no-deprecated-custom-properties': 'error',
      'circuit-ui/no-deprecated-props': 'error',
      'circuit-ui/no-renamed-props': 'error',
      'circuit-ui/prefer-custom-properties': 'warn',
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    extends: [storybook.configs['flat/recommended'], configs.stories],
  },
  {
    files: [...files.stories, ...files.tests],
    rules: {
      'import-x/no-relative-packages': 'off',
      'react-server-components/use-client': 'off',
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
    files: ['templates/astro/**/*'],
    rules: {
      'notice/notice': 'off',
    },
  },
  {
    files: ['templates/nextjs/**/*'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
