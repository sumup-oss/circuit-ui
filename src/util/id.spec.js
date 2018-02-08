import { uniqueId } from './id';

describe('Id', () => {
  it('should generate a unique, auto-incrementing id', () => {
    const firstActual = uniqueId();
    const firstExpected = '1';
    expect(firstActual).toBe(firstExpected);
    const secondActual = uniqueId();
    const secondExpected = '2';
    expect(secondActual).toBe(secondExpected);
  });

  it('should optionally prefix the id', () => {
    const actual = uniqueId();
    const expected = '3';
    expect(actual).toBe(expected);
  });
});
