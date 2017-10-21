import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import { sizesToConfig } from './service';
import styles from './index.scss';

const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

const Text = ({ size, display, children, className, ...props }) => {
  const sizeConfig = sizesToConfig(SIZES, size);
  const displayClass = display === 'inline' ? 'text--inline' : 'text';
  const classes = classNames(className, displayClass, sizeConfig);
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

Text.propTypes = {
  size: PropTypes.oneOf(SIZES),
  display: PropTypes.oneOf(['inline', 'block']),
  children: PropTypes.node
};

Text.defaultProps = {
  size: 'm',
  display: 'block'
};

export default withStyles(styles)(Text);
