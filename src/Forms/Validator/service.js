import {
  trim,
  negate,
  intersection,
  mergeAll,
  keys,
  flow,
  omit,
  mapValues,
  curry,
  includes
} from 'lodash/fp';

export const hasRegexError = curry(
  (rule, caseInsensitive, allowSpaces, value) => {
    if (!rule || !value) {
      return false;
    }
    const regexArgs = caseInsensitive ? [rule, 'i'] : [rule];
    const regex = typeof rule === 'object' ? rule : new RegExp(...regexArgs);
    const valueAfterSpacesRule = allowSpaces
      ? value.replace(/\s+/g, '')
      : value;
    return !regex.test(valueAfterSpacesRule);
  }
);

export const hasRequiredError = curry(
  (isRequired, value) => (isRequired ? !value || !value.length : false)
);

export const hasNumberError = curry((min, max, value) => {
  const minMaxValid = typeof min === 'number' && typeof max === 'number';
  if (minMaxValid && min > max) {
    throw new Error({
      message: 'Min cannot be greater than max',
      value: `${min}, ${max}`
    });
  }

  return minMaxValid && typeof value === 'number'
    ? value < min || value > max
    : true;
});

export const hasValueError = curry(
  (values, value) =>
    value && values && value.length ? includes(value, values) : false
);

export const getErrors = curry((meta, value) => {
  const {
    regex,
    caseInsensitive,
    allowSpaces,
    required,
    min,
    max,
    values
  } = meta;

  const builtInValidators = {
    regex: hasRegexError(regex, caseInsensitive, allowSpaces),
    required: hasRequiredError(required),
    number: hasNumberError(min, max),
    values: hasValueError(values)
  };

  const customValidators = omit(keys(builtInValidators), meta);

  // Negate custom validators so people can write their custom
  // validations as positive functions
  // (e.g. isNumber => n => typeof n === 'number';)
  const allValidators = mergeAll([
    builtInValidators,
    mapValues(negate, customValidators)
  ]);

  return applyValidations(allValidators, value);
});

function applyValidations(validators, value) {
  return mapValues(validator => flow(trim, validator)(value), validators);
}

export function valueHasChanged(value, nextValue) {
  if (Array.isArray(value)) {
    const sharedValues = intersection(value, nextValue);
    return (
      value.length !== nextValue.length || sharedValues.length !== value.length
    );
  }
  return value !== nextValue;
}
