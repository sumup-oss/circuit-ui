import { configs, defineConfig, files } from '@sumup-oss/foundry/eslint';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
// eslint-disable-next-line import-x/namespace, import-x/no-deprecated, import-x/default, import-x/no-named-as-default, import-x/no-named-as-default-member
import circuitUI from '@sumup-oss/eslint-plugin-circuit-ui';

// TODO: Re-add react-server-components plugin once it supports ESLint v9

export default defineConfig([
  configs.ignores,
  configs.javascript,
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
    extends: [circuitUI.configs.recommended],
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
    extends: [testingLibrary.configs['flat/react'], configs.tests],
    plugins: { 'testing-library': testingLibrary },
    rules: {
      'testing-library/no-container': 'warn',
    },
  },
  {
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
]);
