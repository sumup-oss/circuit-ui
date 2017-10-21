import { createElement } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const HEADLINE_TYPES = ['h1', 'h2', 'h3', 'h4', 'h5'];

const Headline = ({ type, children, displayOnly, ...props }) => {
  const tagName = displayOnly ? 'p' : type;
  return createElement(tagName, { children, ...props });
};

Headline.propTypes = {
  type: PropTypes.oneOf(HEADLINE_TYPES),
  displayOnly: PropTypes.bool,
  children: PropTypes.node
};

export default withStyles(styles)(Headline);
