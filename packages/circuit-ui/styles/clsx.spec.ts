/**
 * Copyright 2023, SumUp Ltd.
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

import { describe, it, expect } from 'vitest';

import { clsx } from './clsx.js';

describe('clsx', () => {
  it('should concatenate classnames', () => {
    const actual = clsx('foo', 'bar');
    expect(actual).toBe('foo bar');
  });

  it('should skip falsy classnames', () => {
    const actual = clsx('foo', false, null, undefined, 'bar');
    expect(actual).toBe('foo bar');
  });
});
