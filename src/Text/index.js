import { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import { sizesToConfig } from './service';
import styles from './index.scss';

const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

const Text = ({ size, display, children, className, ...props }) => {
  const sizeConfig = sizesToConfig(SIZES, size);
  const { displayClass, tagName } =
    display === 'block'
      ? { displayClass: 'text', tagName: 'p' }
      : { displayClass: 'text--inline', tagName: 'span' };

  const classes = classNames(className, displayClass, sizeConfig);
  return createElement(tagName, { className: classes, ...props, children });
};

Text.propTypes = {
  size: PropTypes.oneOf(SIZES),
  className: PropTypes.string,
  display: PropTypes.oneOf(['inline', 'block']),
  children: PropTypes.node
};

Text.defaultProps = {
  size: 'm',
  display: 'block'
};

export default withStyles(styles)(Text);
