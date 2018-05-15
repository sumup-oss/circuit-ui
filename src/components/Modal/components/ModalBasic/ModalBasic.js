import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ModalWrapper, ModalHeader } from '..';

const ModalDefault = ({ title, onClose, children }) => (
  <ModalWrapper>
    <ModalHeader onClose={onClose} title={title} />
    <Fragment>{children}</Fragment>
  </ModalWrapper>
);

ModalDefault.propTypes = {
  /**
   * Title ot the modal
   */
  title: PropTypes.string.isRequired,
  /**
   * onClose clalback. When missing modal has no close button
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Modal contents
   */
  children: PropTypes.node.isRequired
};

export default ModalDefault;
