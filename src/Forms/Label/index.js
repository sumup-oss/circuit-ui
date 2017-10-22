import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../util/withStyles';
import { isOptional } from '../service';
import styles from './index.scss';

function Label({
  id,
  validations,
  meta,
  styleAsOptional,
  optionalLabel = '(Optional)',
  children
}) {
  const optional = isOptional({ validations, meta, styleAsOptional });
  const classes = optional ? 'label label--optional' : 'label';
  return (
    <label htmlFor={id} className={classes}>
      {children} {optional && optionalLabel}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  meta: PropTypes.object,
  styleAsOptional: PropTypes.bool,
  optionalLabel: PropTypes.string,
  validations: PropTypes.object
};

export default withStyles(styles)(Label);
