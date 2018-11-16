import { withProps } from 'recompose';

import { isEnter, isSpacebar } from './key-codes';

export const createOnKeyDown = onClick => {
  if (!onClick) {
    return null;
  }

  return event => {
    // Most clickable HTML elements can also be triggered by pressing the
    // spacebar or enter key.
    if (isEnter(event) || isSpacebar(event)) {
      onClick(event);
    }
  };
};

export default withProps(({ onClick, ...props }) => ({
  onKeyDown: createOnKeyDown(onClick),
  onClick,
  ...props
}));
