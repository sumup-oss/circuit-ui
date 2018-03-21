import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from 'react-emotion';

import Tooltip from '../../../Tooltip';

const baseStyles = () => css`
  label: input__tooltip;
  right: 1px;
`;

/**
 * Tooltip component to display errors and warnings. Used for styling and
 * aligment purposes only.
 */
const InputTooltip = ({ children, ...props }) => (
  <Tooltip
    className={cx(baseStyles())}
    position={Tooltip.TOP}
    align={Tooltip.LEFT}
    {...props}
  >
    {children}
  </Tooltip>
);

InputTooltip.propTypes = {
  /**
   * The content of the tooltip.
   */
  children: PropTypes.node.isRequired,
  /**
   * Determines whether the tooltip should be visible.
   */
  visible: PropTypes.bool
};

InputTooltip.defaultProps = {
  visible: false
};

/**
 * @component
 */
export default InputTooltip;
