import { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import { sizesToConfig } from './service';
import styles from './index.scss';

const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

const Text = ({ size, inline, children, className, ...props }) => {
  const sizeConfig = sizesToConfig(SIZES, size);
  const { displayClass, tagName } = inline
    ? { displayClass: 'text--inline', tagName: 'span' }
    : { displayClass: 'text', tagName: 'p' };

  const classes = classNames(className, displayClass, sizeConfig);
  return createElement(tagName, { className: classes, ...props, children });
};

Text.propTypes = {
  size: PropTypes.oneOf(SIZES),
  className: PropTypes.string,
  inline: PropTypes.bool,
  children: PropTypes.node
};

Text.defaultProps = {
  size: 'm',
  inline: false
};

export default withStyles(styles)(Text);
