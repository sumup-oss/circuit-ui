/**
 * Copyright 2024, SumUp Ltd.
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

import { describe, it } from 'vitest';

import { normalizePhoneNumber } from './PhoneNumberInputService.js';

describe('PhoneNumberInputService', () => {
  describe('normalizePhoneNumber', () => {
    it('should merge the country code and subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '23456789';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+123456789');
    });

    it('should strip non-numeric characters from the subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '(234) 567-8910';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+12345678910');
    });

    it('should strip leading zeros from the subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '0023456789';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+123456789');
    });
  });
});
