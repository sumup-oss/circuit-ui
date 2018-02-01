import id from './unique-id';

describe('Id', () => {
  it('should generate a unique, auto-incrementing id', () => {
    const firstActual = id();
    const firstExpected = '1';
    expect(firstActual).toBe(firstExpected);
    const secondActual = id();
    const secondExpected = '2';
    expect(secondActual).toBe(secondExpected);
  });

  it('should optionally prefix the id', () => {
    const actual = id();
    const expected = '3';
    expect(actual).toBe(expected);
  });
});
