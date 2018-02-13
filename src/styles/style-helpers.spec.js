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
  it('should throw an error when values do not have the same unit', () => {
    expect(() => StyleHelpers.addUnit(a, b, d)).toThrowErrorMatchingSnapshot();
  });
  it('should throw an error when multiple values have a unit', () => {
    expect(() =>
      StyleHelpers.multiplyUnit(a, b)
    ).toThrowErrorMatchingSnapshot();
  });
});
