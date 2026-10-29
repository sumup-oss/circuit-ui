/**
 * Copyright 2026, SumUp Ltd.
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

import { describe, expect, it } from 'vitest';

import { compactRange } from './range.js';

describe('compactRange', () => {
  it('should keep the ends that are set', () => {
    expect(compactRange({ min: 1, max: 5 })).toEqual({ min: 1, max: 5 });
  });

  it('should remove the ends that are undefined', () => {
    expect(compactRange({ min: undefined, max: 5 })).toEqual({ max: 5 });
  });

  it('should keep an end that is 0', () => {
    expect(compactRange({ min: 0, max: undefined })).toEqual({ min: 0 });
  });

  it('should return undefined when both ends are empty', () => {
    expect(compactRange({ min: undefined, max: undefined })).toBeUndefined();
  });
});
