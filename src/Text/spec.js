import { sizesToConfig } from './service';

describe('Text', () => {
  it('should convert a size list to className list', () => {
    const sizes = ['s', 'm'];
    const size = 's';
    const expected = { 'type-s': true, 'type-m': false };
    const actual = sizesToConfig(sizes, size);
    expect(actual).toEqual(expected);
  });
});
