import { isOptional, getInputClasses } from './service';

describe('isOptional', () => {
  it('should be optional when meta info says not required', () => {
    const meta = { required: false };
    const expected = true;
    const actual = isOptional({ meta });
    expect(actual).toEqual(expected);
  });
  it('should never style as optional if styleAsOptional is false', () => {
    const meta = { required: false };
    const expected = false;
    const actual = isOptional({ meta, styleAsOptional: false });
    expect(actual).toEqual(expected);
  });
});

describe('getInputClasses', () => {
  it('should always at least return the `input` classname', () => {
    const actual = getInputClasses();
    const expected = 'input';
    expect(actual).toContain(expected);
  });
  it('should have an optional class if field is not required', () => {
    const config = { optional: true };
    const actual = getInputClasses(config);
    const expected = 'input--optional';
    expect(actual).toContain(expected);
  });
});
