import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: tabs;

  padding: ${theme.spacings.mega};
`;

/**
 * Describe Tabs here.
 */
const Tabs = styled('element')(baseStyles);

Tabs.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

Tabs.defaultProps = {};

/**
 * @component
 */
export default Tabs;
