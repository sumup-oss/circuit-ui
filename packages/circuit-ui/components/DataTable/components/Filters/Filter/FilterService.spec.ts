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

import type { ColumnType } from '../../../types.js';

import type { FilterValue } from './types.js';

import {
  getAmountKind,
  getFilterKind,
  getFilterSummary,
  normalizeFilterValue,
} from './FilterService.js';

describe('FilterService', () => {
  const options = [{ label: 'Paid', value: 'paid' }];

  describe('getFilterKind', () => {
    it.each([
      [{ name: 'singleSelection', options }, 'multi'],
      [{ name: 'multiSelection', options }, 'multi'],
      [{ name: 'number' }, 'number'],
      [{ name: 'date' }, 'date'],
    ] as [
      ColumnType,
      string,
    ][])('should return the kind for the %j column', (type, kind) => {
      expect(getFilterKind({ type, filter: true })).toBe(kind);
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

  describe('normalizeFilterValue', () => {
    it.each([
      [{ name: 'number' }, { min: 7, max: 0 }, { min: 0, max: 7 }],
      [
        { name: 'date' },
        { from: '2026-02-01', to: '2026-01-10' },
        { from: '2026-01-10', to: '2026-02-01' },
      ],
    ] as [
      ColumnType,
      FilterValue,
      FilterValue,
    ][])('should swap the ends of a reversed %j range', (type, value, expected) => {
      expect(normalizeFilterValue({ type }, value)).toEqual(expected);
    });

    it.each([
      [{ name: 'number' }, { min: 0, max: 7 }],
      [{ name: 'number' }, { min: 7, max: 7 }],
      [{ name: 'number' }, { min: 7 }],
      [{ name: 'number' }, { max: 0 }],
      [{ name: 'date' }, { from: '2026-01-10' }],
      [{ name: 'multiSelection', options }, ['paid']],
    ] as [
      ColumnType,
      FilterValue,
    ][])('should keep the %j value %j as it is', (type, value) => {
      expect(normalizeFilterValue({ type }, value)).toEqual(value);
    });

    it('should return undefined without a value', () => {
      expect(
        normalizeFilterValue({ type: { name: 'number' } }, undefined),
      ).toBeUndefined();
    });
  });

  describe('getFilterSummary', () => {
    const summarize = (
      type: ColumnType,
      value: Parameters<typeof getFilterSummary>[1],
    ) => getFilterSummary({ type }, value, 'en-US');

    it('should return undefined without a value', () => {
      expect(summarize({ name: 'multiSelection', options }, undefined)).toBe(
        undefined,
      );
    });

    it.each([
      [{ name: 'singleSelection', options }],
      [{ name: 'multiSelection', options }],
    ] as [
      ColumnType,
    ][])('should return the number of selections for a %j column', (type) => {
      expect(summarize(type, ['a', 'b'])).toBe('2');
    });

    it('should return the range of a number column', () => {
      expect(summarize({ name: 'number' }, { min: 5, max: 1200 })).toBe(
        '5 – 1,200',
      );
    });

    it('should return the range of a percentage column', () => {
      expect(
        summarize(
          { name: 'number', formattingOptions: { style: 'percent' } },
          { min: 10, max: 12.5 },
        ),
      ).toBe('10% – 12.5%');
    });

    it('should return the range of a currency column', () => {
      expect(
        summarize(
          {
            name: 'number',
            formattingOptions: { style: 'currency', currency: 'EUR' },
          },
          { min: 10, max: 50 },
        ),
      ).toBe('€10.00 – €50.00');
    });

    it('should return the range of a date column', () => {
      expect(
        summarize({ name: 'date' }, { from: '2026-10-08', to: '2026-10-15' }),
      ).toBe('Oct 8, 2026 – Oct 15, 2026');
    });

    it('should describe a range with only a minimum or a maximum', () => {
      expect(summarize({ name: 'number' }, { min: 5 })).toBe('≥ 5');
      expect(summarize({ name: 'number' }, { max: 5 })).toBe('≤ 5');
    });
  });
});
