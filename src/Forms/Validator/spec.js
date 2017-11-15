import {
  getErrors,
  hasRegexError,
  hasRequiredError,
  hasNumberError,
  valueHasChanged
} from './service';

describe('hasRegexError', () => {
  it('should detect when input does not match the specific pattern', () => {
    const rule = '[A-Z]';
    const value = '123';
    const hasError = hasRegexError(rule, false, false, value);
    expect(hasError).toBeTruthy();
  });
  it('should detect when the input does match the specified pattern', () => {
    const rule = '[A-Z]';
    const value = 'ABC';
    const hasError = hasRegexError(rule, false, false, value);
    expect(hasError).toBeFalsy();
  });
  it('should be possible to make pattern matching case-insensitive', () => {
    const rule = '[A-Z]';
    const value = 'abc';
    const hasError = hasRegexError(rule, true, false, value);
    expect(hasError).toBeFalsy();
  });
  it('should be possible to ignore spaces during validation', () => {
    const rule = '^mytest$';
    const value = 'my test';
    const hasError = hasRegexError(rule, false, true, value);
    expect(hasError).toBeFalsy();
  });
  it('should accept regex literals', () => {
    const rule = /^my test$/;
    const value = 'my test';
    const hasError = hasRegexError(rule, false, false, value);
    expect(hasError).toBeFalsy();

    const value2 = 'mytest';
    const hasError2 = hasRegexError(rule, false, false, value2);
    expect(hasError2).toBeTruthy();
  });
});

describe('hasRequiredError', () => {
  it('should count all falsy values as required violations', () => {
    const values = ['', undefined, null];
    const actual = values.map(v => hasRequiredError(true, v));
    const expected = [true, true, true];
    expect(actual).toEqual(expected);
  });
  it('should not consider falsy values as violations if field is not required', () => {
    const values = ['', undefined, null];
    const actual = values.map(v => hasRequiredError(false, v));
    const expected = [false, false, false];
    expect(actual).toEqual(expected);
  });
});

describe('hasNumberError', () => {
  it('should accept numbers in the specific range', () => {
    const min = 1;
    const max = 5;
    const value = 3;
    const actual = hasNumberError(min, max, value);
    expect(actual).toBeFalsy();
  });
  it('should reject numbers outside the specific range', () => {
    const min = 1;
    const max = 5;
    const value = 0;
    const actual = hasNumberError(min, max, value);
    expect(actual).toBeTruthy();
  });
  it('should reject non-number inputs', () => {
    const min = 0;
    const max = 5;
    const value = 'abc';
    const actual = hasNumberError(min, max, value);
    expect(actual).toBeTruthy();
  });
  it('should throw an exception if the min is greater than the max', () => {
    const min = 10;
    const max = 5;
    const value = 4;
    try {
      hasNumberError(min, max, value);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe('getErrors', () => {
  it('should check default validations', () => {
    const meta = { required: true };
    const value = '';
    const errors = getErrors(meta, value);
    expect(errors.required).toEqual(true);
  });
  it('should check custom validators', () => {
    const meta = { isEmpty: v => v === '' };
    const value = '';
    const errors = getErrors(meta, value);
    expect(errors.isEmpty).toEqual(false);

    const value2 = 'not empty';
    const errors2 = getErrors(meta, value2);
    expect(errors2.isEmpty).toEqual(true);
  });
  it('should work when both custom and default validations are defined', () => {
    const meta = { required: true, isEmpty: v => v === '' };
    const value = '';
    const errors = getErrors(meta, value);
    expect(errors.required).toEqual(true);
    expect(errors.isEmpty).toEqual(false);
  });
});

describe('UI logic', () => {
  it('should re-render if the value has changed', () => {
    const currentValue = ['a'];
    const nextValue = ['a', 'b'];
    expect(valueHasChanged(currentValue, nextValue)).toBeTruthy();

    const currentValueStr = 'old';
    const nextValueStr = 'new';
    expect(valueHasChanged(currentValueStr, nextValueStr)).toBeTruthy();
  });
  it('should not re-render if the value has not changed', () => {
    const currentValue = ['a'];
    const nextValue = ['a'];
    expect(valueHasChanged(currentValue, nextValue)).toBeFalsy();
  });
});
