import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../../../src/themes';

const Box = styled('div')`
  ${({ theme, spacingName }) => css`
    width: ${theme.spacings[spacingName]};
    height: ${theme.spacings[spacingName]};
    border-radius: ${theme.borderRadius.kilo};
    background-color: ${theme.colors.r300};
    display: block;
    margin-right: ${theme.spacings.mega};
    margin-bottom: ${theme.spacings.giga};
    position: relative;

    &:before {
      content: '${spacingName}';
      pointer-events: all;
      position: absolute;
      color: ${theme.colors.black};
      bottom: -${theme.spacings.giga};
    }
  `};
`;

const Spacing = ({ spacingName }) => (
  <ThemeProvider theme={standard}>
    <Box spacingName={spacingName} />
  </ThemeProvider>
);

Spacing.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  spacingName: PropTypes.string.isRequired
};

export default Spacing;
