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

import { describe, expect, it } from 'vitest';

import {
  getOptionByValue,
  isGroup,
  isOptionFocused,
} from './AutocompleteInputService.js';

describe('AutocompleteService', () => {
  describe('getOptionByValue', () => {
    it('returns undefined if value is undefined', () => {
      const options = [{ value: 'test', label: 'Test' }];
      expect(getOptionByValue(options)).toBe(undefined);
    });

    it('returns an object for given value', () => {
      const options = [{ value: 'test', label: 'Test' }];
      expect(getOptionByValue(options, 'test')).toBe(options[0]);
    });

    it('returns undefined if no matching option was found', () => {
      const options = [{ value: 'test', label: 'Test' }];
      expect(getOptionByValue(options, 'unknown')).toBe(undefined);
    });
  });

  describe('isOptionFocused', () => {
    it('returns false if activeOption is undefined', () => {
      expect(isOptionFocused([], '', undefined)).toBe(false);
    });

    it('returns true if activeOption matches a value', () => {
      expect(isOptionFocused(['test'], 'test', 0)).toBe(true);
    });

    it('returns false if activeOption does not match any value', () => {
      expect(isOptionFocused(['test'], 'other', 0)).toBe(false);
    });
  });

  describe('isGroup', () => {
    it('returns true for a group of options', () => {
      const group = {
        label: 'Group',
        options: [{ value: '1', label: 'One' }],
      };
      expect(isGroup(group)).toBe(true);
    });

    it('returns false for single option', () => {
      const option = { value: '1', label: 'One' };
      expect(isGroup(option)).toBe(false);
    });
  });
});
