/**
 * Copyright 2020, SumUp Ltd.
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

/* eslint-disable no-console */

import { warning } from './warning';

describe('warning', () => {
  let NODE_ENV: string | undefined;

  beforeAll(() => {
    global.console = { ...global.console, warn: jest.fn() };
    NODE_ENV = process.env.NODE_ENV;
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.env.NODE_ENV = NODE_ENV;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should log a message to the console when first called', () => {
    const message = 'This is a warning.';
    warning(message);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(message);
  });

  it('should not log a message to the console when called again with the same message', () => {
    const message = 'This is a warning.';
    warning(message);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should log a message to the console when called again with a different message', () => {
    const message = 'This is another warning.';
    warning(message);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(message);
  });

  it('should not log a message in production', () => {
    process.env.NODE_ENV = 'production';
    const message = 'This is a production warning.';
    warning(message);

    expect(console.warn).not.toHaveBeenCalled();
  });
});
