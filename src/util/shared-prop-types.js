import PropTypes from 'prop-types';

export const interactivePropTypes = {
  analyticsId: PropTypes
};

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

export const childrenRenderPropType = PropTypes.func;
