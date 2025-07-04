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
  getSuggestionLabelByValue,
  isGroup,
  isSuggestionFocused,
} from './AutocompleteInputService.js';

describe('AutocompleteService', () => {
  describe('getSuggestionLabelByValue', () => {
    it('returns empty string if value is undefined', () => {
      const suggestions = [{ value: 'test', label: 'Test' }];
      expect(getSuggestionLabelByValue(suggestions)).toBe('');
    });

    it('returns label for given value', () => {
      const suggestions = [{ value: 'test', label: 'Test' }];
      expect(getSuggestionLabelByValue(suggestions, 'test')).toBe('Test');
    });

    it('returns value as is if no matching suggestion was found', () => {
      const suggestions = [{ value: 'test', label: 'Test' }];
      expect(getSuggestionLabelByValue(suggestions, 'unknown')).toBe('unknown');
    });
  });

  describe('isSuggestionFocused', () => {
    it('returns false if activeSuggestion is undefined', () => {
      expect(isSuggestionFocused([], '', undefined)).toBe(false);
    });

    it('returns true if activeSuggestion matches a value', () => {
      expect(isSuggestionFocused(['test'], 'test', 0)).toBe(true);
    });

    it('returns false if activeSuggestion does not match any value', () => {
      expect(isSuggestionFocused(['test'], 'other', 0)).toBe(false);
    });
  });

  describe('isGroup', () => {
    it('returns true for group suggestion', () => {
      const group = {
        label: 'Group',
        suggestions: [{ value: '1', label: 'One' }],
      };
      expect(isGroup(group)).toBe(true);
    });

    it('returns false for single suggestion', () => {
      const suggestion = { value: '1', label: 'One' };
      expect(isGroup(suggestion)).toBe(false);
    });
  });
});
