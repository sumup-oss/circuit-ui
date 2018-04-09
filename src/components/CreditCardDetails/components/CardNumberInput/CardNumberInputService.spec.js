import {
  detectCardScheme,
  parseCardNumber,
  normalizeCardNumber,
  isValidCardNumber,
  isAcceptedCardScheme,
  isDisabledSchemeIcon,
  hasDetectedScheme,
  shouldRenderSchemesUnderInput
} from './CardNumberInputService';
import { cardSchemeIcons } from '../';
import { schemes as cardSchemes } from '../..';
import { filter, pick, values } from '../../../../util/fp';

describe('CardNumberInputService', () => {
  const { SCHEMES } = cardSchemes;
  const SCHEME_NAMES = values(SCHEMES);

  const runNumberValidation = value => {
    const validValue = value;
    const invalidValue = `${value.slice(0, -1)}2`;
    const actualValid = isValidCardNumber(validValue);
    expect(actualValid).toBeTruthy();
    const actualInvalid = isValidCardNumber(invalidValue);
    expect(actualInvalid).toBeFalsy();
  };

  const runInvalidSchemeLengthValidation = value => {
    const invalidValue = value.slice(0, -1);
    const actual = isValidCardNumber(invalidValue);
    expect(actual).toBeFalsy();
  };

  const CARD_NUMBERS = {
    VISA_13: '4916721083783',
    VISA_16: '4539590612077349',
    MASTERCARD: '5582727407337149',
    AMEX: '349777034622483',
    DINERS: '36966280052150',
    DISCOVER: '6011138511225890',
    MAESTRO_12: '505568816258',
    MAESTRO_13: '5056703681533',
    MAESTRO_14: '50544250345556',
    MAESTRO_15: '505188325671074',
    MAESTRO_16: '5627567084488055',
    MAESTRO_17: '57212434035537187',
    MAESTRO_18: '578321853304455503',
    MAESTRO_19: '5021488423877057584',
    JCB_16: '3528775395242898',
    EN_ROUTE: '214953602300768', // Unknown scheme
    fallback: '0000000000000'
  };

  describe('validating card schemes', () => {
    it('should detect a not accepted card scheme', () => {
      const value = CARD_NUMBERS.fallback;
      const actual = isAcceptedCardScheme(SCHEME_NAMES, value);
      expect(actual).toBeFalsy();
    });

    it('should detect an accepted card scheme', () => {
      const value = CARD_NUMBERS.VISA_13;
      const actual = isAcceptedCardScheme(SCHEME_NAMES, value);
      expect(actual).toBeTruthy();
    });
  });

  describe('validating card number values', () => {
    describe('validating card number values against a given scheme', () => {
      it('should always fail validation for an unknown card scheme numbers, when they are less than 13 digits long', () => {
        const value = CARD_NUMBERS.fallback.slice(0, -1);
        const actual = isValidCardNumber(value);
        expect(actual).toBeFalsy();
      });

      it('should validate unknown card scheme numbers when they are at least 13 digits long', () => {
        // Here we are using a valid card number of an unknown scheme.
        runNumberValidation(CARD_NUMBERS.EN_ROUTE);
      });

      describe('Visa', () => {
        it('should validate VISA numbers with 13 digits', () => {
          runNumberValidation(CARD_NUMBERS.VISA_13);
        });

        it('should validate VISA numbers with 16 digits', () => {
          runNumberValidation(CARD_NUMBERS.VISA_16);
        });

        it('should reject Visa numbers with other lengths', () => {
          runInvalidSchemeLengthValidation(CARD_NUMBERS.VISA_16);
        });
      });

      describe('Mastercard', () => {
        it('should validate Mastercard numbers 16 digits', () => {
          runNumberValidation(CARD_NUMBERS.MASTERCARD);
        });

        it('should reject Mastercard numbers with other lengths', () => {
          runInvalidSchemeLengthValidation(CARD_NUMBERS.MASTERCARD);
        });
      });

      describe('American Express', () => {
        it('should validate Amex numbers with 15 digits', () => {
          runNumberValidation(CARD_NUMBERS.AMEX);
        });

        it('should reject Amex numbers with other lengths', () => {
          runInvalidSchemeLengthValidation(CARD_NUMBERS.AMEX);
        });
      });

      describe("Diner's Club", () => {
        it("should validate Diner's numbers with 14 digits", () => {
          runNumberValidation(CARD_NUMBERS.DINERS);
        });

        it("should reject Diner's numbers with other lengths", () => {
          runInvalidSchemeLengthValidation(CARD_NUMBERS.DINERS);
        });
      });

      describe('Discover', () => {
        it('should validate Discover numbers with 16 digits', () => {
          runNumberValidation(CARD_NUMBERS.DISCOVER);
        });

        it('should reject Discover numbers with other lengths', () => {
          runInvalidSchemeLengthValidation(CARD_NUMBERS.DISCOVER);
        });
      });

      describe('Maestro', () => {
        it('should validate Maestro numbers with 12 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_12);
        });

        it('should validate Maestro numbers with 13 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_13);
        });

        it('should validate Maestro numbers with 14 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_14);
        });

        it('should validate Maestro numbers with 15 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_15);
        });

        it('should validate Maestro numbers with 16 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_16);
        });

        it('should validate Maestro numbers with 17 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_17);
        });

        it('should validate Maestro numbers with 18 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_18);
        });

        it('should validate Maestro numbers with 19 digits', () => {
          runNumberValidation(CARD_NUMBERS.MAESTRO_19);
        });

        it('should reject Maestro numbers with other lengths', () => {
          runInvalidSchemeLengthValidation(CARD_NUMBERS.MAESTRO_12);
        });
      });

      describe('JCB', () => {
        it('should validate JCB numbers with 16 digits', () => {
          runNumberValidation(CARD_NUMBERS.JCB_16);
        });

        it('should reject JCB numbers with other lengths', () => {
          runNumberValidation(CARD_NUMBERS.JCB_16);
        });
      });
    });
  });

  describe('Detecting card schemes', () => {
    it('should detect a VISA card', () => {
      const expected = SCHEMES.VISA;
      const actual13 = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.VISA_13);
      const actual16 = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.VISA_16);
      expect(actual13).toBe(expected);
      expect(actual16).toBe(expected);
    });

    it('should detect a Mastercard card', () => {
      const expected = SCHEMES.MASTERCARD;
      const actual = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.MASTERCARD);
      expect(actual).toBe(expected);
    });

    it('should detect a Amex card', () => {
      const expected = SCHEMES.AMEX;
      const actual = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.AMEX);
      expect(actual).toBe(expected);
    });

    it('should detect a Diners card', () => {
      const expected = SCHEMES.DINERS;
      const actual = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.DINERS);
      expect(actual).toBe(expected);
    });

    it('should detect a Discover card', () => {
      const expected = SCHEMES.DISCOVER;
      const actual = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.DISCOVER);
      expect(actual).toBe(expected);
    });

    it('should detect a Maestro card outside of Brazil', () => {
      // The 13 digit Maestro numbers conflict with Elo in Brazil.
      // We either need to improve the detection or we can simply
      // ignore this, because Maestro and Elo aren't both enabled
      // online.
      const nonBrazilSchemes = filter(
        scheme => scheme !== SCHEMES.ELO,
        SCHEME_NAMES
      );
      const expected = SCHEMES.MAESTRO;
      const actual12 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_12
      );
      const actual13 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_13
      );
      const actual15 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_15
      );
      const actual16 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_16
      );
      const actual17 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_17
      );
      const actual18 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_18
      );
      const actual19 = detectCardScheme(
        nonBrazilSchemes,
        CARD_NUMBERS.MAESTRO_19
      );
      expect(actual12).toBe(expected);
      expect(actual13).toBe(expected);
      expect(actual15).toBe(expected);
      expect(actual16).toBe(expected);
      expect(actual17).toBe(expected);
      expect(actual18).toBe(expected);
      expect(actual19).toBe(expected);
    });

    it('should detect a JCB card', () => {
      const expected = SCHEMES.JCB;
      const actual = detectCardScheme(SCHEME_NAMES, CARD_NUMBERS.JCB_16);
      expect(actual).toBe(expected);
    });
  });

  describe('providing helper functions for the UI', () => {
    it('should determine which schemes are visually disabled', () => {
      const detectedScheme = SCHEMES.VISA;
      const disabledScheme = SCHEMES.MASTERCARD;
      const enabledScheme = SCHEMES.VISA;
      const value = CARD_NUMBERS.VISA_13;

      const isDisabled = isDisabledSchemeIcon(
        value,
        detectedScheme,
        disabledScheme
      );
      expect(isDisabled).toBeTruthy();
      const isEnabled = !isDisabledSchemeIcon(
        value,
        detectedScheme,
        enabledScheme
      );
      expect(isEnabled).toBeTruthy();
    });

    it('should determine whether to show the detected scheme text', () => {
      const noScheme = '';
      const isUndetected = !hasDetectedScheme(noScheme);
      expect(isUndetected).toBeTruthy();
      const detectedScheme = SCHEMES.VISA;
      const isDetected = hasDetectedScheme(detectedScheme);
      expect(isDetected).toBeTruthy();
    });

    it('should render scheme icons above the input on mobile, when up to five schemes are supported', () => {
      // This is only used and applied on mobile.
      const fiveSchemes = [
        SCHEMES.VISA,
        SCHEMES.MASTERCARD,
        SCHEMES.JCB,
        SCHEMES.DINERS,
        SCHEMES.DISCOVERY
      ];
      const fiveSupportedSchemes = pick(fiveSchemes, cardSchemeIcons);
      const isRenderedAbove = !shouldRenderSchemesUnderInput(
        fiveSupportedSchemes
      );
      expect(isRenderedAbove).toBeTruthy();
    });

    it('should render scheme icons under the input on mobile, when more than five schemes are supported', () => {
      // This is only used and applied on mobile.
      const sixSchemes = [
        SCHEMES.VISA,
        SCHEMES.MASTERCARD,
        SCHEMES.JCB,
        SCHEMES.DINERS,
        SCHEMES.DISCOVER,
        SCHEMES.ELO
      ];
      const sixSupportedSchemes = pick(sixSchemes, cardSchemeIcons);
      const shouldRenderUnder = shouldRenderSchemesUnderInput(
        sixSupportedSchemes
      );
      expect(shouldRenderUnder).toBeTruthy();
    });
  });

  describe('parsing credit card numbers', () => {
    it('should chunk the card number into blocks of four digits', () => {
      const cardNumber = '12345678909876543';
      const expected = '1234 5678 9098 7654 3';
      const actual = parseCardNumber(cardNumber);
      expect(actual).toBe(expected);
    });

    it('should ignore non-numeric values', () => {
      const cardNumber = '  sdjfhksjdf45632shfsdfsdf ----/dfsd42323  ';
      const expected = '4563 2423 23';
      const actual = parseCardNumber(cardNumber);
      expect(actual).toBe(expected);
    });

    it('should not do anything when passed a falsy value', () => {
      const actual = parseCardNumber(null);
      expect(actual).toBeNull();
    });

    it('should return an empty string when passed an empty string', () => {
      const expected = '';
      const actual = parseCardNumber('');
      expect(actual).toBe(expected);
    });

    it('should not do anything when editing already parsed chunks', () => {
      const cardNumber = '1234 568 45'; // Here the user is editing the second chunk.
      const expected = '1234 568 45';
      const actual = parseCardNumber(cardNumber);
      expect(actual).toBe(expected);
    });
  });

  describe('normalizing credit card number', () => {
    it('should remove all non-digit characters', () => {
      const value = '12f34 5678 9098 7654 3';
      const expected = '12345678909876543';
      const actual = normalizeCardNumber(value);
      expect(actual).toBe(expected);
    });
  });
});
