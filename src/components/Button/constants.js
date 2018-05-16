import PropTypes from 'prop-types';

import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

export const LOADING_STATES = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const EXIT_ANIMATION_DURATION = 2000;

export const SIZE_PROP_TYPE = PropTypes.oneOf([KILO, MEGA, GIGA]);
