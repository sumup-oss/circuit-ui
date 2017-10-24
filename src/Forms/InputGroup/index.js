import React from 'react';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';

const InputGroup = ({ children }) => (
  <ul className="input-group--inline">{children}</ul>
);

export default withStyles(styles)(InputGroup);
