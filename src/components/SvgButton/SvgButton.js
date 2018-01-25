import PropTypes from 'prop-types';
import styled from 'react-emotion';

/**
 * SvgButton component for forms.
 */
const SvgButton = styled('button', { label: 'svg-button' })`
  label: svg-button;
  padding: 0;
  margin: 0;
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: default;

  &:focus,
  &:active {
    outline: none;
  }
`;

SvgButton.propTypes = {
  children: PropTypes.element.isRequired
};

/**
 * @component
 */
export default SvgButton;
