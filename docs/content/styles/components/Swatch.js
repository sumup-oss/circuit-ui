import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../../../src/themes';

const SWATCH_SIZE = '150px';

const Color = styled('div')`
  ${({ theme, colorName }) => css`
    width: ${SWATCH_SIZE};
    height: ${SWATCH_SIZE};
    border-radius: ${theme.borderRadius.giga};
    background-color: ${theme.colors[colorName]};
    display: inline-block;
    margin-right: ${theme.spacings.mega};
    margin-bottom: ${theme.spacings.mega};
    position: relative;

    &:before {
      content: '${colorName}';
      position: absolute;
      background-color: ${theme.colors.n100};
      padding: ${theme.spacings.byte} ${theme.spacings.mega};
      border-radius: ${theme.borderRadius.mega};
      top: ${theme.spacings.kilo};
      right: ${theme.spacings.kilo};
    }
  `};
`;

const Swatch = ({ colorName }) => (
  <ThemeProvider theme={standard}>
    <Color colorName={colorName} />
  </ThemeProvider>
);

Swatch.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  colorName: PropTypes.string.isRequired
};

export default Swatch;
