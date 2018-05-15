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
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default ModalDefault;
