import * as StyleHelpers from './style-helpers';

describe('Style helpers', () => {
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
