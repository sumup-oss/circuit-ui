import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  font-size: ${theme.typography.headings.kilo.fontSize};
  line-height: ${theme.typography.headings.kilo.lineHeight};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.n100};
  margin-left: ${theme.spacings.mega};
`;

const Title = styled('h1')(baseStyles);

Title.propTypes = {
  /**
   * The children component passed to the Title
   */
  children: PropTypes.node
};

/**
 * @component
 */
export default Title;
