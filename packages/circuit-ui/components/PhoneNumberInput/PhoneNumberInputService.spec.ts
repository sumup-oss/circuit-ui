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

import { describe, expect, it } from 'vitest';

import { getIconURL } from '@sumup-oss/icons';

import {
  filterCountryCodeOptions,
  getCountryCodeAutocompleteValue,
  getCountryFlagIcon,
  mapCountryCodeOptions,
  normalizePhoneNumber,
  parsePhoneNumber,
} from './PhoneNumberInputService.js';

describe('PhoneNumberInputService', () => {
  describe('parsePhoneNumber', () => {
    const options = [
      { country: 'US', code: '+1' },
      { country: 'AG', code: '+1', areaCodes: ['268'] },
      { country: 'CA', code: '+1' },
      { country: 'DE', code: '+49' },
    ];

    it('should parse an empty phone number', () => {
      const phoneNumber = '';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBeUndefined();
      expect(actual.subscriberNumber).toBeUndefined();
    });

    it('should parse a full, well-formatted phone number', () => {
      const phoneNumber = '+1 707 555 2323';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBe('US');
      expect(actual.subscriberNumber).toBe('707 555 2323');
    });

    it('should parse a full phone number with unsupported characters', () => {
      const phoneNumber = '+1 (707) 555-2323';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBe('US');
      expect(actual.subscriberNumber).toBe('707 555 2323');
    });

    it('should parse a phone number with a double-0 prefixed country code', () => {
      const phoneNumber = '001 (707) 555-2323';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBe('US');
      expect(actual.subscriberNumber).toBe('707 555 2323');
    });

    it('should parse a phone number without a country code', () => {
      const phoneNumber = '(707) 555-2323';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBeUndefined();
      expect(actual.subscriberNumber).toBe('707 555 2323');
    });

    it('should parse a phone number with an unsupported country code', () => {
      const phoneNumber = '+99 (707) 555-2323';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBeUndefined();
      expect(actual.subscriberNumber).toBe('+99 707 555 2323');
    });

    it('should parse a phone number without a subscriber number', () => {
      const phoneNumber = '+49';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBe('DE');
      expect(actual.subscriberNumber).toBeUndefined();
    });

    it('should parse a phone number with a country-specific area code', () => {
      const phoneNumber = '+1 (268) 32423424';
      const actual = parsePhoneNumber(phoneNumber, options);
      expect(actual.countryCode).toBe('AG');
      expect(actual.subscriberNumber).toBe('268 32423424');
    });

    it('should parse an incomplete phone number with an ambiguous country code', () => {
      const phoneNumber = '+1';
      const currentCountry = 'US';
      const actual = parsePhoneNumber(phoneNumber, options, currentCountry);
      expect(actual.countryCode).toBe('US');
      expect(actual.subscriberNumber).toBeUndefined();
    });
  });

  describe('normalizePhoneNumber', () => {
    it('should merge the country code and subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '23456789';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+123456789');
    });

    it('should replace non-numeric, non-whitespace characters in the subscriber number', () => {
      const countryCode = '+1';
      const subscriberNumber = '(234) 567-8910';
      const actual = normalizePhoneNumber(countryCode, subscriberNumber);
      expect(actual).toBe('+1 234 567 8910');
    });

    it('should replace unsupported whitespace characters with single spaces in the subscriber number', () => {
      const countryCode = '+1';
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
      const locale = 'en';
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].value).toBe('CA');
      expect(actual[1].value).toBe('DE');
      expect(actual[2].value).toBe('US');
    });

    it('should use the country code as the option label', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const locale = 'en';
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].label).toBe('+1');
      expect(actual[1].label).toBe('+49');
      expect(actual[2].label).toBe('+1');
    });

    it('should use the country name as the option description', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const locale = 'en';
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].description).toBe('Canada');
      expect(actual[1].description).toBe('Germany');
      expect(actual[2].description).toBe('United States');
    });

    it('should omit the country name when it is not available', () => {
      const options = [{ country: '', code: '+49' }];
      const locale = 'en';
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].label).toBe('+49');
    });

    it('should sort the options alphabetically by country name', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const locale = 'en';
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].description).toBe('Canada');
      expect(actual[1].description).toBe('Germany');
      expect(actual[2].description).toBe('United States');
    });
  });

  describe('getCountryFlagIcon', () => {
    it('should return the flag icon URL for a country code', () => {
      expect(getCountryFlagIcon('DE')).toBe(getIconURL('flag_de'));
    });
  });

  describe('filterCountryCodeOptions', () => {
    const options = [
      { label: '+1', value: 'CA', description: 'Canada' },
      { label: '+49', value: 'DE', description: 'Germany' },
      { label: '+1', value: 'US', description: 'United States' },
    ];

    it('should return all options for an empty query', () => {
      expect(filterCountryCodeOptions(options, '')).toEqual(options);
    });

    it('should filter options by label', () => {
      expect(filterCountryCodeOptions(options, '+49')).toEqual([
        { label: '+49', value: 'DE', description: 'Germany' },
      ]);
    });

    it('should filter options by value', () => {
      expect(filterCountryCodeOptions(options, 'us')).toEqual([
        { label: '+1', value: 'US', description: 'United States' },
      ]);
    });

    it('should filter options by description', () => {
      expect(filterCountryCodeOptions(options, 'unit')).toEqual([
        { label: '+1', value: 'US', description: 'United States' },
      ]);
    });
  });

  describe('getCountryCodeAutocompleteValue', () => {
    const options = [{ label: '+1', value: 'CA', description: 'Canada' }];

    it('should return the matching option', () => {
      expect(getCountryCodeAutocompleteValue(options, 'CA')).toEqual(
        options[0],
      );
    });

    it('should return undefined when the country is missing', () => {
      expect(
        getCountryCodeAutocompleteValue(options, undefined),
      ).toBeUndefined();
    });
  });
});
