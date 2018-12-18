/** @jsx jsx */

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import CloseButton from '../../../CloseButton';
import { childrenPropType } from '../../../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: card__header;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.giga};
`;

const noHeadingStyles = ({ children }) =>
  !children[0] &&
  css`
    label: card__header--no-heading;
    justify-content: flex-end;
  `;

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
const CardHeaderContainer = styled('header')`
  ${baseStyles};
  ${noHeadingStyles};
`;

const CardHeader = ({ onClose, children, labelCloseButton, ...props }) => (
  <CardHeaderContainer {...props}>
    {children}
    {onClose && <CloseButton onClick={onClose} label={labelCloseButton} />}
  </CardHeaderContainer>
);

CardHeader.propTypes = {
  /**
   * Heading to be shown.
   */
  children: childrenPropType,
  /**
   * Callback for the close button. If not specified, the button won't
   * be shown.
   */
  onClose: PropTypes.func,
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  labelCloseButton: PropTypes.string
};

CardHeader.defaultProps = {
  onClose: null,
  children: null
};

/**
 * @component
 */
export default CardHeader;
