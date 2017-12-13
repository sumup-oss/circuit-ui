import { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const HEADLINE_TYPES = ['h1', 'h2', 'h3', 'h4', 'h5'];

const Headline = ({ type, children, displayOnly, className, ...props }) => {
  const tagName = displayOnly ? 'p' : type;
  const headlineClasses = displayOnly ? type : '';
  const classes = classNames(headlineClasses, className);
  return createElement(tagName, { children, className: classes, ...props });
};

Headline.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(HEADLINE_TYPES),
  displayOnly: PropTypes.bool,
  children: PropTypes.node
};

export default withStyles(styles)(Headline);
