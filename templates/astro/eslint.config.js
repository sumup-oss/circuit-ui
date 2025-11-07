import circuitUI from '@sumup-oss/eslint-plugin-circuit-ui';
import { configs, defineConfig, files } from '@sumup-oss/foundry/eslint';
import react from 'eslint-plugin-react';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
  configs.ignores,
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
  },
  configs.browser,
  {
    extends: [testingLibrary.configs['flat/react'], configs.tests],
  },
]);
