import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import CloseButton from '../../../CloseButton';

const baseStyles = ({ theme }) => css`
  label: card__header;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.giga};
`;

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
const CardHeaderContainer = styled('header')`
  ${baseStyles};
`;

const CardHeader = ({ onClose, children }) => (
  <CardHeaderContainer>
    {children}
    {onClose && <CloseButton onClick={onClose} />}
  </CardHeaderContainer>
);

CardHeader.propTypes = {
  /**
   * Heading and/or CloseButton for closing.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /**
   * Callback for the close button. If not specified, the button won't
   * be shown.
   */
  onClose: PropTypes.func
};

CardHeader.defaultProps = {
  onClose: null
};

/**
 * @component
 */
export default CardHeader;
