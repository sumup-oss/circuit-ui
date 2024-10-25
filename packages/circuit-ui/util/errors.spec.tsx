/**
 * Copyright 2022, SumUp Ltd.
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

import { describe, expect, test } from 'vitest';

import { isSufficientlyLabelled } from './errors';

describe('errors', () => {
  describe('isSufficientlyLabelled', () => {
    describe('should return false', () => {
      test('when the label and attributes are missing', () => {
        const label = undefined;
        const attributes = undefined;
        expect(isSufficientlyLabelled(label, attributes)).toBe(false);
      });

      test('when the label is an empty string', () => {
        const label = ' ';
        const attributes = undefined;
        expect(isSufficientlyLabelled(label, attributes)).toBe(false);
      });

      test('when the aria-label is an empty string', () => {
        const label = undefined;
        const attributes = { 'aria-label': ' ' };
        expect(isSufficientlyLabelled(label, attributes)).toBe(false);
      });

      test('when the aria-labelledby is an empty string', () => {
        const label = undefined;
        const attributes = { 'aria-labelledby': ' ' };
        expect(isSufficientlyLabelled(label, attributes)).toBe(false);
      });
    });

    describe('should return true', () => {
      test('when the element is hidden', () => {
        const label = undefined;
        const attributes = { 'aria-hidden': 'true' };
        expect(isSufficientlyLabelled(label, attributes)).toBe(true);
      });

      test('when the label is a valid string', () => {
        const label = 'Email address';
        const attributes = undefined;
        expect(isSufficientlyLabelled(label, attributes)).toBe(true);
      });

      // Labels shouldn't contain structured markup since it is ignored
      // by screen readers. We allow this only as an escape hatch to use
      // at your own risk.
      test('when the label is defined but not a string', () => {
        const label = <div>Label</div>;
        const attributes = undefined;
        // @ts-expect-error We're testing for this error.
        expect(isSufficientlyLabelled(label, attributes)).toBe(true);
      });

      test('when the label is undefined but the aria-label is a valid string', () => {
        const label = undefined;
        const attributes = { 'aria-label': 'Label' };
        expect(isSufficientlyLabelled(label, attributes)).toBe(true);
      });

      test('when the label is undefined but the aria-labelledby is a valid string', () => {
        const label = undefined;
        const attributes = { 'aria-labelledby': ':r1:' };
        expect(isSufficientlyLabelled(label, attributes)).toBe(true);
      });
    });
  });
});
