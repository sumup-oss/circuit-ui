/**
 * Copyright 2024, SumUp Ltd.
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

import { beforeEach, describe, expect, it } from 'vitest';

import { getEnvVariable } from './env.js';

declare let process: {
  env: Record<string, string>;
};

describe('env', () => {
  describe('getEnvVariable', () => {
    const originalProcess = process;

    beforeEach(() => {
      process = originalProcess;
      process.env = {};
    });

    it('should return the environment variable`', () => {
      process.env.FOO = 'foo';
      const actual = getEnvVariable('FOO');
      expect(actual).toBe('foo');
    });

    it('should return undefined if the environment variable is not defined', () => {
      const actual = getEnvVariable('FOO');
      expect(actual).toBeUndefined();
    });

    it('should return undefined if `process` is not defined', () => {
      // @ts-expect-error We're testing for this error
      process = undefined;
      const actual = getEnvVariable('FOO');
      expect(actual).toBeUndefined();
    });

    it('should throw an error when used for `NODE_ENV`', () => {
      const actual = () => getEnvVariable('NODE_ENV');
      expect(actual).toThrowError();
    });
  });
});
