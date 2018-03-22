function charToRegex(value) {
  const escapeChars = "\\.+*?[^]$(){}=!<>|:-'";
  if (escapeChars.indexOf(value) >= 0) {
    return `\\${value}`;
  }
  return value;
}

function stringToRegex(value) {
  return value
    .split('')
    .map(v => charToRegex(v))
    .join('')
    .replace(/[\s]/g, '\\s');
}

function arrayOfStringsToRegex(values = []) {
  return values.map(value => stringToRegex(value));
}

export function currencyToRegex(
  thousandSeparators = [' ', '.', ',', "'", '`'],
  decimalNumbers = 2,
  decimalSeparators = ['.', ','],
  thousandGroupNumbers = 3
) {
  const thousandSeparatorsRegex = arrayOfStringsToRegex(
    thousandSeparators
  ).join('|');
  const decimalSeparatorsRegex = arrayOfStringsToRegex(decimalSeparators).join(
    '|'
  );

  const integerRegex = `(\\d{0,${thousandGroupNumbers -
    1}}(?:(?:${thousandSeparatorsRegex})?\\d{${thousandGroupNumbers}})*)`;
  const decimalRegex =
    decimalNumbers > 0
      ? `(?:(?:${decimalSeparatorsRegex})(\\d{0,${decimalNumbers}}))?`
      : '';

  return `^${integerRegex}${decimalRegex}$`;
}
