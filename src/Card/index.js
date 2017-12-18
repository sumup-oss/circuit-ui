import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.scss';
import withStyles from '../../util/withStyles';

const Card = ({ variant, className, children, ...props }) => {
  const cardClass = `card--${variant}`;
  const allClasses = classNames(cardClass, className);
  return (
    <div className={allClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'overlay', 'inlay'])
};

Card.defaultProps = {
  variant: 'standard'
};

export default withStyles(styles)(Card);
