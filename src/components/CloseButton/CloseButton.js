import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { hideVisually } from 'polished';

import { svgKilo } from '../../styles/style-helpers';
import SvgButton from '../SvgButton';
import { ReactComponent as Icon } from './close-icon.svg';

const SvgCloseButton = styled(SvgButton)(
  ({ theme }) => css`
    label: close-button;
    ${svgKilo({ theme })};
  `
);

const labelBaseStyles = () => css`
  ${hideVisually()};
`;

// Important for accessibility
const ButtonLabel = styled('span')`
  ${labelBaseStyles};
`;

/**
 * A generic close button.
 */
const CloseButton = ({ label, ...props }) => (
  <SvgCloseButton {...props}>
    <Icon />
    <ButtonLabel>{label}</ButtonLabel>
  </SvgCloseButton>
);

CloseButton.propTypes = {
  /**
   * Text label for screen readers. Important for accessibility.
   */
  label: PropTypes.string
};

CloseButton.defaultProps = {
  label: 'close'
};

/**
 * @component
 */
export default CloseButton;
