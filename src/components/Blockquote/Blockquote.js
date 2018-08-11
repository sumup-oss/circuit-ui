import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import Text from '../Text';

const baseStyles = ({ theme }) => css`
  label: blockquote;
  padding-left: ${theme.spacings.kilo};
  border-left: 2px solid ${theme.colors.p500};
`;

const gigaStyles = ({ theme, size }) =>
  size === Text.GIGA &&
  css`
    label: blockquote--giga;
    padding-left: ${theme.spacings.mega};
    border-left: 3px solid ${theme.colors.p500};
  `;

const StyledText = styled(Text)`
  ${baseStyles};
  ${gigaStyles};
`;

/**
 * Indented and italicised text to denote a quotation.
 */
const Quote = ({ children, ...props }) => (
  <StyledText {...props} element="blockquote" italic>
    {children}
  </StyledText>
);

// Satisfy react docgen
const Blockquote = props => <Quote {...props} />;

Blockquote.KILO = Text.KILO;
Blockquote.MEGA = Text.MEGA;
Blockquote.GIGA = Text.GIGA;

Blockquote.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType.isRequired,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf([Blockquote.KILO, Blockquote.MEGA, Blockquote.GIGA])
};

Quote.propTypes = Blockquote.propTypes;

Blockquote.defaultProps = {
  size: Blockquote.KILO
};

/**
 * @component
 */
export default Blockquote;
