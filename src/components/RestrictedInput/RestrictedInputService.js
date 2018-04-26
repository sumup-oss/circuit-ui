import { includes, isArray } from '../../util/fp';

const DEFAULT_KEYS = [
  'Tab',
  'Return',
  'Delete',
  'Backspace',
  'Meta',
  'Control',
  'Alt',
  'F5',
  'Unidentified' // This is here because legacy Chrome on XP sends it.
];

export const handleKeyDown = userFilteredKeys => {
  if (!isArray(userFilteredKeys) || !userFilteredKeys.length) {
    return undefined;
  }
  const filteredKeys = [...DEFAULT_KEYS, ...userFilteredKeys];
  return e => {
    // TODO: think about replacing this with a regex.
    if (e.key !== undefined && !includes(e.key, filteredKeys)) {
      e.preventDefault();
    }
  };
};

export const handleCarretPosition = (outerHandler, alignCarretLeft) => e => {
  const { target } = e;
  const position = alignCarretLeft ? 0 : target.value.length;
  target.setSelectionRange(position, position);
  if (outerHandler) {
    outerHandler(e);
  }
};
