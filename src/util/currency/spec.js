import * as currency from '.';

describe('currency', () => {
  describe('getCurrencyFormat()', () => {
    it('should return a format object for a currency and locale.', () => {
      const ccy = 'EUR';
      const locale = 'de-DE';
      const actual = currency.getCurrencyFormat(ccy, locale);
      expect(actual).toMatchSnapshot();
    });

    it('should fall back to the default format for a currency, if locale is not found.', () => {
      const ccy = 'EUR';
      const locale = 'en-GB';
      const actual = currency.getCurrencyFormat(ccy, locale);
      expect(actual).toMatchSnapshot();
    });

    it('should throw a TypeError if currency is not supported.', () => {
      const ccy = 'BITCOIN';
      const locale = 'de-DE';
      const actual = () => currency.getCurrencyFormat(ccy, locale);
      expect(actual).toThrow();
    });
  });
  describe('formatCurrency()', () => {
    const inputs = ['11.23', 1000, 0.98];

    const testCurrency = (amounts, ccy, locale, expected) => {
      const actual = amounts.map(amount =>
        currency.formatCurrency(amount, ccy, locale)
      );
      expect(actual).toEqual(expected);
    };

    it('should localize EUR for Belgium', () => {
      const outputsFr = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'fr-BE', outputsFr);

      const outputsNl = ['€\xA011,23', '€\xA01.000,00', '€\xA00,98'];
      testCurrency(inputs, 'EUR', 'nl-BE', outputsNl);
    });

    it('should localize EUR for Germany', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'de-DE', outputs);
    });

    it('should localize EUR for Spain', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'es-ES', outputs);
    });

    it('should localize EUR for France', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'fr-FR', outputs);
    });

    it('should localize EUR for Ireland', () => {
      const outputs = ['€11.23', '€1,000.00', '€0.98'];
      testCurrency(inputs, 'EUR', 'en-IE', outputs);
    });

    it('should localize EUR for Italy', () => {
      const outputs = ['11,23\xA0€', '1.000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'it-IT', outputs);
    });

    it('should localize EUR for Netherlands', () => {
      const outputs = ['€\xA011,23', '€\xA01.000,00', '€\xA00,98'];
      testCurrency(inputs, 'EUR', 'nl-NL', outputs);
    });

    it('should localize EUR for Portugal', () => {
      const outputs = ['11,23\xA0€', '1\xA0000,00\xA0€', '0,98\xA0€'];
      testCurrency(inputs, 'EUR', 'pt-PT', outputs);
    });

    it('should localize CHF', () => {
      const outputsDe = ['CHF\xA011.23', "CHF\xA01'000.00", 'CHF\xA00.98'];
      testCurrency(inputs, 'CHF', 'de-CH', outputsDe);

      const outputsIt = ['11,23\xA0CHF', '1.000,00\xA0CHF', '0,98\xA0CHF'];
      testCurrency(inputs, 'CHF', 'it-CH', outputsIt);

      const outputsFr = ['CHF\xA011.23', 'CHF\xA01\xA0000.00', 'CHF\xA00.98'];
      testCurrency(inputs, 'CHF', 'fr-CH', outputsFr);
    });

    it('should localize GBP', () => {
      const outputs = ['£11.23', '£1,000.00', '£0.98'];
      testCurrency(inputs, 'GBP', 'en-GB', outputs);
    });

    it('should localize PLN', () => {
      const outputs = ['11,23\xA0zł', '1\xA0000,00\xA0zł', '0,98\xA0zł'];
      testCurrency(inputs, 'PLN', 'pl-PL', outputs);
    });

    it('should localize RUB', () => {
      const outputs = ['11,23\xA0руб.', '1\xA0000,00\xA0руб.', '0,98\xA0руб.'];
      testCurrency(inputs, 'RUB', 'ru-RU', outputs);
    });

    it('should localize BRL', () => {
      const outputs = ['R$\xA011,23', 'R$\xA01.000,00', 'R$\xA00,98'];
      testCurrency(inputs, 'BRL', 'pt-BR', outputs);
    });

    it('should localize SEK', () => {
      const outputs = ['11,23\xA0kr', '1\xA0000,00\xA0kr', '0,98\xA0kr'];
      testCurrency(inputs, 'SEK', 'sv-SE', outputs);
    });

    it('should localize USD', () => {
      const outputs = ['$11.23', '$1,000.00', '$0.98'];
      testCurrency(inputs, 'USD', 'en-US', outputs);
    });

    it('should localize CLP', () => {
      const outputs = ['$\xA011', '$\xA01.000', '$\xA01'];
      testCurrency(inputs, 'CLP', 'es-CL', outputs);
    });

    it('should localize BGN', () => {
      const outputs = ['11,23\xA0лв.', '1\xA0000,00\xA0лв.', '0,98\xA0лв.'];
      testCurrency(inputs, 'BGN', 'bg-BG', outputs);
    });

    it('should localize CZK', () => {
      const outputs = ['11,23\xA0Kč', '1\xA0000,00\xA0Kč', '0,98\xA0Kč'];
      testCurrency(inputs, 'CZK', 'cs-CZ', outputs);
    });

    it('should localize DKK', () => {
      const outputs = ['11,23\xA0kr.', '1.000,00\xA0kr.', '0,98\xA0kr.'];
      testCurrency(inputs, 'DKK', 'da-DK', outputs);
    });

    it('should localize HUF', () => {
      const outputs = ['11\xA0Ft', '1\xA0000\xA0Ft', '1\xA0Ft'];
      testCurrency(inputs, 'HUF', 'hu-HU', outputs);
    });

    it('should localize NOK', () => {
      const outputsNb = ['11,23\xA0kr', '1\xA0000,00\xA0kr', '0,98\xA0kr'];
      testCurrency(inputs, 'NOK', 'nb-NO', outputsNb);

      const outputsNn = ['11,23\xA0kr', '1\xA0000,00\xA0kr', '0,98\xA0kr'];
      testCurrency(inputs, 'NOK', 'nn-NO', outputsNn);
    });

    it('should localize RON', () => {
      const outputs = ['11,23\xA0Lei', '1.000,00\xA0Lei', '0,98\xA0Lei'];
      testCurrency(inputs, 'RON', 'ro-RO', outputs);
    });

    it('should localize HRK', () => {
      const outputs = ['11,23\xA0kn', '1.000,00\xA0kn', '0,98\xA0kn'];
      testCurrency(inputs, 'HRK', 'hr-HR', outputs);
    });
  });
});
