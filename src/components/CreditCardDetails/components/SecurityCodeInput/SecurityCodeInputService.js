import { schemes } from '../..';

const { SCHEMES } = schemes;

export const getPlaceholder = cardScheme =>
  cardScheme === SCHEMES.AMEX ? '1234' : '123';

export const ACTIONS = {
  TOGGLE_MODAL: 'toggle modal'
};

export const initialState = {
  isShowingModal: false
};

export const stateReducer = action => prevState => {
  switch (action) {
    case ACTIONS.TOGGLE_MODAL:
      return { isOpen: !prevState.isOpen };
    default:
      return prevState;
  }
};
