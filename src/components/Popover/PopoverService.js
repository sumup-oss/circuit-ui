import { CENTER } from '../../util/constants';

// popper.js modifiers
// read more: https://popper.js.org/popper-documentation.html#modifiers
export const popperModifiers = {
  offset: { enabled: true, offset: '0,10' },
  flip: { enabled: true }
};

export function toPopperPlacement(placement, align) {
  return placement + (align !== CENTER ? `-${align}` : '');
}
