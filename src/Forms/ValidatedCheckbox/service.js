import { includes } from 'lodash/fp';

export function isChecked({ value, field, form: { data } }) {
  const currentValues = data.values[field];
  return includes(value, currentValues);
}

export function mergeNewValue(currentValues, newValue) {
  const containsCurrentValue = includes(newValue, currentValues);
  return containsCurrentValue
    ? currentValues.filter(x => x !== newValue)
    : currentValues.concat(newValue);
}
