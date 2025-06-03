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
  computeTabIndex,
  getSuggestionLabelByValue,
  isGroup,
  isSuggestionFocused,
} from './AutocompleteService.js';

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

    it('returns value if no matching label found', () => {
      const suggestions = [{ value: 'test', label: 'Test' }];
      expect(getSuggestionLabelByValue(suggestions, 'unknown')).toBe('unknown');
    });
  });

  describe('computeTabIndex', () => {
    it('returns -1 if activeSuggestion is undefined', () => {
      expect(computeTabIndex([], '', false)).toBe(-1);
    });

    it('returns 0 if activeSuggestion matches value and not loading', () => {
      expect(computeTabIndex(['test'], 'test', false, 0)).toBe(0);
    });

    it('returns -1 if activeSuggestion does not match value', () => {
      expect(computeTabIndex(['test'], 'other', false, 0)).toBe(-1);
    });

    it('returns -1 if isLoading is true', () => {
      expect(computeTabIndex(['test'], 'test', true, 0)).toBe(-1);
    });
  });

  describe('isSuggestionFocused', () => {
    it('returns false if activeSuggestion is undefined', () => {
      expect(isSuggestionFocused([], '', undefined)).toBe(false);
    });

    it('returns true if activeSuggestion matches value', () => {
      expect(isSuggestionFocused(['test'], 'test', 0)).toBe(true);
    });

    it('returns false if activeSuggestion does not match value', () => {
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
