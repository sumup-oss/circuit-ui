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

import {
  getCountryCodeFieldWidth,
  mapCountryCodeOptions,
  normalizePhoneNumber,
  parsePhoneNumber,
  resolveCountryCodeOptionLabel,
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
      const locale = undefined;
      const actual = mapCountryCodeOptions(options, locale);
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
      const locale = undefined;
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].label).toBe('Canada (+1)');
      expect(actual[1].label).toBe('Germany (+49)');
      expect(actual[2].label).toBe('United States (+1)');
    });

    it('should omit the country name when it is not available', () => {
      const options = [{ country: '', code: '+49' }];
      const locale = undefined;
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].label).toBe('+49');
    });

    it('should sort the options alphabetically', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const locale = undefined;
      const actual = mapCountryCodeOptions(options, locale);
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
      const locale = 'DE';
      const actual = mapCountryCodeOptions(options, locale);
      expect(actual[0].value).toBe('DE');
    });

    it('should use calling codes as labels when shouldDisplayCountryNames is false', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const actual = mapCountryCodeOptions(options, undefined, false);
      expect(actual[0].label).toBe('+1');
      expect(actual[0].value).toBe('CA');
      expect(actual[1].label).toBe('+1');
      expect(actual[1].value).toBe('US');
      expect(actual[2].label).toBe('+49');
      expect(actual[2].value).toBe('DE');
    });

    it('should sort calling code labels when shouldDisplayCountryNames is false', () => {
      const options = [
        { country: 'DE', code: '+49' },
        { country: 'CA', code: '+1' },
        { country: 'US', code: '+1' },
      ];
      const actual = mapCountryCodeOptions(options, undefined, false);
      expect(actual.map(({ label }) => label)).toEqual(['+1', '+1', '+49']);
    });

    it('should use option.label when provided', () => {
      const options = [
        { country: 'CA', code: '+1', label: 'Canada (+1)' },
        { country: 'DE', code: '+49', label: 'Germany (+49)' },
      ];
      const actual = mapCountryCodeOptions(options, undefined, true);
      expect(actual[0].label).toBe('Canada (+1)');
      expect(actual[1].label).toBe('Germany (+49)');
    });

    it('should use getOptionLabel when provided', () => {
      const options = [
        { country: 'CA', code: '+1' },
        { country: 'DE', code: '+49' },
      ];
      const getOptionLabel = ({ country, code }: { country: string; code: string }) =>
        `${country} ${code}`;
      const actual = mapCountryCodeOptions(
        options,
        undefined,
        true,
        getOptionLabel,
      );
      expect(actual.find(({ value }) => value === 'CA')?.label).toBe('CA +1');
      expect(actual.find(({ value }) => value === 'DE')?.label).toBe('DE +49');
    });

    it('should prefer option.label over getOptionLabel', () => {
      const options = [{ country: 'CA', code: '+1', label: 'Custom label' }];
      const getOptionLabel = () => 'Ignored';
      expect(
        resolveCountryCodeOptionLabel(
          options[0],
          undefined,
          true,
          getOptionLabel,
        ),
      ).toBe('Custom label');
    });
  });

  describe('getCountryCodeFieldWidth', () => {
    const options = [
      { label: 'Canada (+1)' },
      { label: 'Germany (+49)' },
      { label: 'United States (+1)' },
    ];

    it('should size to the longest option label with prefix', () => {
      expect(getCountryCodeFieldWidth(options, 'm', true)).toBe(
        'calc(var(--cui-spacings-exa) + 18ch + var(--cui-spacings-exa))',
      );
    });

    it('should use smaller spacing tokens for size s', () => {
      expect(getCountryCodeFieldWidth(options, 's', true)).toBe(
        'calc(var(--cui-spacings-tera) + 18ch + var(--cui-spacings-tera))',
      );
    });

    it('should omit prefix spacing when there is no prefix', () => {
      expect(getCountryCodeFieldWidth(options, 'm', false)).toBe(
        'calc(var(--cui-spacings-mega) + 18ch + var(--cui-spacings-exa))',
      );
    });

    it('should return undefined when there are no options', () => {
      expect(getCountryCodeFieldWidth([], 'm', true)).toBeUndefined();
    });
  });
});
