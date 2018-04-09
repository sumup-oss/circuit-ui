export const ACTIONS = {
  TOGGLE_INFO: 'toggle info'
};

export const INITIAL_STATE = {
  isShowingInfo: false
};

export const stateReducer = action => prevState => {
  switch (action) {
    case ACTIONS.TOGGLE_INFO:
      return { isShowingInfo: !prevState.isShowingInfo };
    default:
      return prevState;
  }
};
