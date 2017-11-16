export const getPaddedSymbol = (symbol, isPrepended, addSpace) =>
  [
    addSpace && isPrepended ? '\u00a0' : '',
    symbol,
    addSpace && isPrepended ? '' : '\u00a0'
  ].join('');
