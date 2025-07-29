/**
 * Copyright 2025, SumUp Ltd.
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

import { idx } from './idx.js';

describe('idx', () => {
  it('should concatenate ids', () => {
    const actual = idx('foo', 'bar');
    expect(actual).toBe('foo bar');
  });

  it('should skip falsy ids', () => {
    const actual = idx('foo', false, null, undefined, 'bar');
    expect(actual).toBe('foo bar');
  });

  it('should return undefined when no ids are truthy', () => {
    const actual = idx(false, null, undefined);
    expect(actual).toBeUndefined();
  });
});
