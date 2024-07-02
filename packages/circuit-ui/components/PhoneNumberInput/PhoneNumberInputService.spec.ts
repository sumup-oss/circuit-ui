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

import {
  mapCountryCodeOptions,
  normalizePhoneNumber,
} from './PhoneNumberInputService.js';

describe('PhoneNumberInputService', () => {
  describe('normalizePhoneNumber', () => {
    it('should merge the country code and subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '23456789';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+123456789');
    });

    it('should strip non-numeric, non-whitespace characters from the subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '(234) 567-8910';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+1234 5678910');
    });

    it('should replace unsupported whitespace characters with single spaces in the subscriber number', () => {
      const countryCode = '+1';
      // eslint-disable-next-line no-tabs
      const subscriberNumber = '234	567 8910';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+1234 567 8910');
    });

    it('should strip leading zeros from the subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '0023456789';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+123456789');
    });
  });

  describe('mapCountryCodeOptions', () => {
    it('should use the country as the option value', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const actual = mapCountryCodeOptions(options);
      expect(actual[0].value).toBe('CA');
      expect(actual[1].value).toBe('DE');
      expect(actual[2].value).toBe('US');
    });

    it('should use the country name and code as the option label', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const actual = mapCountryCodeOptions(options);
      expect(actual[0].label).toBe('Canada (+1)');
      expect(actual[1].label).toBe('Germany (+49)');
      expect(actual[2].label).toBe('United States (+1)');
    });

    it('should omit the country name when it is not available', () => {
      const options = [{ country: '', code: '+49' }];
      const actual = mapCountryCodeOptions(options);
      expect(actual[0].label).toBe('+49');
    });

    it('should sort the options alphabetically', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const actual = mapCountryCodeOptions(options);
      expect(actual[0].label).toBe('Canada (+1)');
      expect(actual[1].label).toBe('Germany (+49)');
      expect(actual[2].label).toBe('United States (+1)');
    });

    it('should use the locale as the default country code', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const actual = mapCountryCodeOptions(options, 'DE');
      expect(actual[0].value).toBe('DE');
    });
  });
});
