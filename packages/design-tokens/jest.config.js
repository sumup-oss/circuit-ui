/**
 * Copyright 2021, SumUp Ltd.
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

const baseConfig = require('../../jest.config.base');

const packageJson = require('./package.json');

const packageName = packageJson.name.split('@sumup/').pop();

module.exports = {
  ...baseConfig,
  name: packageName,
  displayName: packageName,
  rootDir: '../..',
  roots: [`<rootDir>/packages/${packageName}`],
  clearMocks: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
};
