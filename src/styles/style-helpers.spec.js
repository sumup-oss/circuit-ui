import * as StyleHelpers from './style-helpers';

describe('Style helpers', () => {
  describe('CSS unit calculations', () => {
    const a = '25px';
    const b = '5px';
    const c = 5;
    const d = '2rem';

    it('should add values of the same unit', () => {
      const actual = StyleHelpers.addUnit(a, b, c);
      const expected = '35px';
      expect(actual).toBe(expected);
    });

    it('should subtract values of the same unit', () => {
      const actual = StyleHelpers.subtractUnit(a, b, c);
      const expected = '15px';
      expect(actual).toBe(expected);
    });

    it('should multiply values of the same unit', () => {
      const actual = StyleHelpers.multiplyUnit(a, c);
      const expected = '125px';
      expect(actual).toBe(expected);
    });

    it('should divide values of the same unit', () => {
      const actual = StyleHelpers.divideUnit(a, c);
      const expected = '5px';
      expect(actual).toBe(expected);
    });

    it('should add values without a unit', () => {
      const actual = StyleHelpers.addUnit(a, b, c);
      const expected = '35px';
      expect(actual).toBe(expected);
    });

    it('should return undefined when values do not have the same unit', () => {
      const actual = StyleHelpers.addUnit(a, b, d);
      const expected = '32undefined';
      expect(actual).toBe(expected);
    });

    it('should return undefined when multiple values have a unit', () => {
      const actual = StyleHelpers.multiplyUnit(a, b);
      const expected = '125undefined';
      expect(actual).toBe(expected);
    });
  });

  describe('media queries', () => {
    const queries = {
      breakpoint: 1024,
      mediaExpression: '(max-width: 360px) and (min-height: 740px)'
    };

    it('should create an object of media query strings', () => {
      const input = {
        anExpression: ''
      };

      const actual = StyleHelpers.createMediaQueries(input).anExpression;
      expect(typeof actual).toMatch('string');
    });

    it('should create a min-width query with pixels, when provided an integer value', () => {
      const { breakpoint } = queries;
      const mq = StyleHelpers.createMediaQueries({ breakpoint });
      const actual = `
        ${mq.breakpoint} {
          font-size: 12px;
          line-height: 14px;
        }`;
      const expected = `
        @media (min-width: 1024px) {
          font-size: 12px;
          line-height: 14px;
        }`;

      expect(actual).toBe(expected);
    });

    it('should take the media expression as is, when provided a string value', () => {
      const { mediaExpression } = queries;
      const mq = StyleHelpers.createMediaQueries({ mediaExpression });
      const actual = `
        ${mq.mediaExpression} {
          font-size: 12px;
          line-height: 14px;
        }`;
      const expected = `
        @media (max-width: 360px) and (min-height: 740px) {
          font-size: 12px;
          line-height: 14px;
        }`;

      expect(actual).toBe(expected);
    });
  });
});
