import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

const baseStyles = css`
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

  > svg {
    ${size('100%')};
  }
`;

/**
 * SvgButton component for forms.
 */
const SvgButton = styled('button')`
  ${baseStyles};
`;

SvgButton.propTypes = {
  children: PropTypes.element.isRequired
};

/**
 * @component
 */
export default SvgButton;
