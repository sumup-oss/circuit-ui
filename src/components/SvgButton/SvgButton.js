import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const blockIdentifier = 'svg-button';

const stylesDisabled = ({ disabled }) =>
  disabled &&
  css`
    label: ${blockIdentifier}--disabled;
    button {
      opacity: 0.4;
      pointer-events: none;
    }
  `;

/**
 * SvgButton component for forms.
 */
const SvgButton = styled('button', { label: blockIdentifier })`
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

  ${stylesDisabled};
`;

SvgButton.propTypes = {
  children: PropTypes.element.isRequired
};

/**
 * @component
 */
export default SvgButton;
