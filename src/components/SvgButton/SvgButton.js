import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { size } from 'polished';
import { withProps } from 'recompose';

const baseStyles = ({ theme }) => css`
  label: svg-button;
  padding: 0;
  margin: 0;
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  fill: ${theme.colors.black};
  overflow: initial;

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
export default withProps({ type: 'button' })(SvgButton);
