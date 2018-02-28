import { shouldValidate, detectCardScheme } from './CardNumberInputService';
import { SCHEMES } from './constants/card-schemes';
import { filter, values } from '../../util/fp';

describe('CardNumberInputService', () => {
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
    fallback: '0000000000000'
  };

  describe('determine whether a given card number should be validated', () => {
    describe('Visa', () => {
      it('should run validations for Visa numbers with 13 digits', () => {
        const number = CARD_NUMBERS.VISA_13;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Visa numbers with 16 digits', () => {
        const number = CARD_NUMBERS.VISA_16;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should reject Visa numbers with other lengths', () => {
        const number = CARD_NUMBERS.VISA_16.slice(0, 15);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    describe('Mastercard', () => {
      it('should run validations for Mastercard numbers with 16 digits', () => {
        const number = CARD_NUMBERS.MASTERCARD;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should not run validations for Mastercard numbers with other lengths', () => {
        const number = CARD_NUMBERS.MASTERCARD.slice(0, 15);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    describe('American Express', () => {
      it('should run validations for American Express numbers with 15 digits', () => {
        const number = CARD_NUMBERS.AMEX;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should not run validations for American Express numbers with other lengths', () => {
        const number = CARD_NUMBERS.AMEX.slice(0, 14);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    describe("Diner's Club", () => {
      it("should run validations for Diner's numbers with 14 digits", () => {
        const number = CARD_NUMBERS.DINERS;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it("should not run validations for Diner's numbers with other lengths", () => {
        const number = CARD_NUMBERS.DINERS.slice(0, 13);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    describe('Discover', () => {
      it('should run validations for Discover numbers with 16 digits', () => {
        const number = CARD_NUMBERS.DISCOVER;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should not run validations for Discover numbers with other lengths', () => {
        const number = CARD_NUMBERS.DISCOVER.slice(0, 15);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    describe('Maestro', () => {
      it('should run validations for Maestro numbers with 12 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_12;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 13 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_13;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 14 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_14;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 15 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_15;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 16 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_16;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 17 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_17;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 18 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_18;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should run validations for Maestro numbers with 19 digits', () => {
        const number = CARD_NUMBERS.MAESTRO_19;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should not run validations for Maestro numbers with other lengths', () => {
        const number = CARD_NUMBERS.MAESTRO_12.slice(0, 11);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    describe('JCB', () => {
      it('should run validations for JCB numbers with 16 digits', () => {
        const number = CARD_NUMBERS.JCB_16;
        const actual = shouldValidate(number);
        expect(actual).toBeTruthy();
      });

      it('should not run validations for JCB numbers with other lengths', () => {
        const number = CARD_NUMBERS.JCB_16.slice(0, 15);
        const actual = shouldValidate(number);
        expect(actual).toBeFalsy();
      });
    });

    it('should force validations for unrecognized card numbers with at least 13 digits ', () => {
      const number = CARD_NUMBERS.fallback;
      const actual = shouldValidate(number);
      expect(actual).toBeTruthy();
    });

    it('should never force validations for unrecognized card numbers with less than 13 digits ', () => {
      const number = CARD_NUMBERS.fallback.slice(0, -1);
      const actual = shouldValidate(number);
      expect(actual).toBeFalsy();
    });
  });

  describe('Detecting card schemes', () => {
    const schemes = values(SCHEMES);

    it('should detect a VISA card', () => {
      const expected = SCHEMES.VISA;
      const actual13 = detectCardScheme(CARD_NUMBERS.VISA_13, schemes);
      const actual16 = detectCardScheme(CARD_NUMBERS.VISA_16, schemes);
      expect(actual13).toBe(expected);
      expect(actual16).toBe(expected);
    });

    it('should detect a Mastercard card', () => {
      const expected = SCHEMES.MASTERCARD;
      const actual = detectCardScheme(CARD_NUMBERS.MASTERCARD, schemes);
      expect(actual).toBe(expected);
    });

    it('should detect a Amex card', () => {
      const expected = SCHEMES.AMEX;
      const actual = detectCardScheme(CARD_NUMBERS.AMEX, schemes);
      expect(actual).toBe(expected);
    });

    it('should detect a Diners card', () => {
      const expected = SCHEMES.DINERS;
      const actual = detectCardScheme(CARD_NUMBERS.DINERS, schemes);
      expect(actual).toBe(expected);
    });

    it('should detect a Discover card', () => {
      const expected = SCHEMES.DISCOVER;
      const actual = detectCardScheme(CARD_NUMBERS.DISCOVER, schemes);
      expect(actual).toBe(expected);
    });

    it('should detect a Maestro card outside of Brazil', () => {
      // The 13 digit Maestro numbers conflict with Elo in Brazil.
      // We either need to improve the detection or we can simply
      // ignore this, because Maestro and Elo aren't both enabled
      // online.
      const nonBrazilSchemes = filter(
        scheme => scheme !== SCHEMES.ELO,
        schemes
      );
      const expected = SCHEMES.MAESTRO;
      const actual12 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_12,
        nonBrazilSchemes
      );
      const actual13 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_13,
        nonBrazilSchemes
      );
      const actual15 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_15,
        nonBrazilSchemes
      );
      const actual16 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_16,
        nonBrazilSchemes
      );
      const actual17 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_17,
        nonBrazilSchemes
      );
      const actual18 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_18,
        nonBrazilSchemes
      );
      const actual19 = detectCardScheme(
        CARD_NUMBERS.MAESTRO_19,
        nonBrazilSchemes
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
      const actual = detectCardScheme(CARD_NUMBERS.JCB_16, schemes);
      expect(actual).toBe(expected);
    });
  });
});
