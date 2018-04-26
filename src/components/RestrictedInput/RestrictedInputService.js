import { includes } from '../../util/fp';

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

export const handleKeyDown = userEnabledKeys => {
  const enabledKeys = [...DEFAULT_KEYS, ...userEnabledKeys];
  return e => {
    // TODO: think about replacing this with a regex.
    if (!includes(e.key, enabledKeys)) {
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
