import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: center-container;

  ${'' /* @supports (display: grid) {
    grid-column: 3 / 10;
  } */};
`;

/**
 * A centered container to be placed inside the Grid component.
 */
const CenterContainer = styled('div')(baseStyles);

CenterContainer.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

CenterContainer.defaultProps = {};

/**
 * @component
 */
export default CenterContainer;
