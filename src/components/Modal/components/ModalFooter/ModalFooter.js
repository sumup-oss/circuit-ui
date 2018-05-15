import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

import { CardFooter } from '../../../Card';

/**
 * Describe your component here.
 */
const ModalFooter = ({ children }) => <CardFooter>{children}</CardFooter>;

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * @component
 */
export default withTheme(ModalFooter);
