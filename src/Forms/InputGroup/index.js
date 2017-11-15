import React from 'react';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';

const InputGroup = ({ children }) => (
  <div className="input-group--inline">{children}</div>
);

export default withStyles(styles)(InputGroup);
