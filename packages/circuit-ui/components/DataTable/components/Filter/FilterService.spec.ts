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

import type { ColumnType } from '../../types.js';

import {
  getAmountKind,
  getFilterCount,
  getFilterKind,
} from './FilterService.js';

describe('FilterService', () => {
  const options = [{ label: 'Paid', value: 'paid' }];

  describe('getFilterKind', () => {
    it.each([
      [{ name: 'singleSelection', options }, 'single'],
      [{ name: 'multiSelection', options }, 'multi'],
      [{ name: 'number' }, 'number'],
      [{ name: 'date' }, 'date'],
    ] as [
      ColumnType,
      string,
    ][])('should return the kind for the %j column', (type, kind) => {
      expect(getFilterKind({ type, filter: true })).toBe(kind);
    });

    it.each([[{ name: 'text' }], [{ name: 'boolean' }]] as [
      ColumnType,
    ][])('should return undefined for the unsupported %j column', (type) => {
      expect(getFilterKind({ type, filter: true })).toBeUndefined();
    });

    it('should return undefined when the column has no filter', () => {
      expect(
        getFilterKind({ type: { name: 'date' }, filter: false }),
      ).toBeUndefined();
      expect(getFilterKind({ type: { name: 'date' } })).toBeUndefined();
    });

    it('should return the amount kind for a number column', () => {
      expect(
        getFilterKind({
          type: {
            name: 'number',
            formattingOptions: { style: 'currency', currency: 'EUR' },
          },
          filter: true,
        }),
      ).toBe('currency');
    });
  });

  describe('getAmountKind', () => {
    it('should return currency with its code for a currency format', () => {
      expect(
        getAmountKind({
          name: 'number',
          formattingOptions: { style: 'currency', currency: 'EUR' },
        }),
      ).toEqual({ kind: 'currency', currency: 'EUR' });
    });

    it('should return percentage for a percent format', () => {
      expect(
        getAmountKind({
          name: 'number',
          formattingOptions: { style: 'percent' },
        }),
      ).toEqual({ kind: 'percentage' });
    });

    it('should return number for any other format', () => {
      expect(getAmountKind({ name: 'number' })).toEqual({ kind: 'number' });
      expect(
        getAmountKind({
          name: 'number',
          formattingOptions: { maximumFractionDigits: 2 },
        }),
      ).toEqual({ kind: 'number' });
    });

    it('should return number for a currency format without a currency code', () => {
      expect(
        getAmountKind({
          name: 'number',
          formattingOptions: { style: 'currency' },
        }),
      ).toEqual({ kind: 'number' });
    });
  });

  describe('getFilterCount', () => {
    it('should return 0 without a value', () => {
      expect(getFilterCount('multi', undefined)).toBe(0);
    });

    it('should return the number of selected options for a multi choice', () => {
      expect(getFilterCount('multi', ['a', 'b'])).toBe(2);
    });

    it.each([
      ['single', 'paid'],
      ['number', { min: 1 }],
      ['date', { from: '2026-10-01' }],
    ] as const)('should return 1 for a %s filter with a value', (kind, value) => {
      expect(getFilterCount(kind, value)).toBe(1);
    });
  });
});
