import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

import { CardHeader } from '../../../Card';
import Heading from '../../../Heading';

const ModalHeader = ({ title, onClose }) => (
  <CardHeader onClose={onClose}>
    {title && (
      <Heading size={Heading.KILO} noMargin>
        {title}
      </Heading>
    )}
  </CardHeader>
);

ModalHeader.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired
};

ModalHeader.defaultProps = {
  onClose: null
};

/**
 * @component
 */
export default withTheme(ModalHeader);
