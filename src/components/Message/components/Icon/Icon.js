import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import MessageSuccess from '../../message-success.svg';
import MessageError from '../../message-error.svg';
import MessageWarning from '../MessageWarning';

const ICON_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const ICON_MAP = {
  [ICON_TYPES.SUCCESS]: MessageSuccess,
  [ICON_TYPES.ERROR]: MessageError,
  [ICON_TYPES.WARNING]: MessageWarning
};

const baseStyles = ({ theme }) => css`
  label: message__icon;
  display: block;
  margin-right: ${theme.spacings.mega};
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 0;
`;

/**
 * Icon used in the Message component. Used for styling and alignment
 * purposes only.
 */
const MessageIconContainer = styled('div')(baseStyles);

const MessageIcon = ({ type, children }) => {
  const Icon = ICON_MAP[type];

  return (
    <MessageIconContainer>{Icon ? <Icon /> : children}</MessageIconContainer>
  );
};

MessageIcon.SUCCESS = ICON_TYPES.SUCCESS;
MessageIcon.ERROR = ICON_TYPES.ERROR;
MessageIcon.WARNING = ICON_TYPES.WARNING;

MessageIcon.propTypes = {
  /**
   * Icon
   */
  children: PropTypes.element,
  type: PropTypes.oneOf([
    ICON_TYPES.SUCCESS,
    ICON_TYPES.ERROR,
    ICON_TYPES.WARNING
  ])
};

MessageIcon.defaultProps = {
  type: null,
  children: null
};

/**
 * @component
 */
export default MessageIcon;
