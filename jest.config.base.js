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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // HACK: See https://github.com/storybookjs/storybook/pull/9292
  moduleNameMapper: {
    'react-syntax-highlighter/dist/esm/(.*)':
      'react-syntax-highlighter/dist/cjs/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(md|mdx)$': '<rootDir>/jest.mdxTransformer.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testURL: 'http://localhost',
};
