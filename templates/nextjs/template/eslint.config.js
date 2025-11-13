import next from '@next/eslint-plugin-next';
import circuitUI from '@sumup-oss/eslint-plugin-circuit-ui';
import { configs, defineConfig } from '@sumup-oss/foundry/eslint';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
  configs.ignores,
  {
    extends: [configs.typescript],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.cjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    extends: [
      next.configs.recommended,
      configs.next,
      circuitUI.configs.recommended,
    ],
  },
  configs.browser,
  {
    extends: [
      jest.configs['flat/recommended'],
      testingLibrary.configs['flat/react'],
      configs.tests,
    ],
  },
]);
