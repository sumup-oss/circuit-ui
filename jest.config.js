/**
 * Copyright 2019, SumUp Ltd.
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

module.exports = {
  preset: 'ts-jest',
  testURL: 'http://localhost',
  coverageDirectory: './__coverage__',
  rootDir: '.',
  roots: ['src', 'scripts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/@(components|util|styles)/**/*.{ts,tsx,js,jsx}',
    '!src/@(components|util|styles)/**/index.{ts,tsx,js,jsx}',
    '!src/@(components|util|styles)/**/*.stories.{ts,tsx,js,jsx}',
    '!src/@(components|util|styles)/**/*.docs.mdx',
    '!**/node_modules/**',
  ],
  moduleDirectories: ['node_modules', 'src'],
  // HACK: See https://github.com/storybookjs/storybook/pull/9292
  moduleNameMapper: {
    'react-syntax-highlighter/dist/esm/(.*)':
      'react-syntax-highlighter/dist/cjs/$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(md|mdx)$': '<rootDir>/jest.mdxTransformer.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
};
