import { isEqual } from 'lodash/fp';

import { LOADING_STATES } from './constants';

export const isActive = isEqual(LOADING_STATES.ACTIVE);
export const isDisabled = isEqual(LOADING_STATES.DISABLED);
export const isSuccess = isEqual(LOADING_STATES.SUCCESS);
