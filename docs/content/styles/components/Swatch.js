import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../../../src/themes';
import { shadowSingle } from '../../../../src/styles/style-helpers';
import Text from '../../../../src/components/Text';

const SWATCH_HEIGHT = '150px';
const SWATCH_WIDTH = '135px';

const Color = styled('div')`
  ${({ theme, colorName }) => css`
    width: ${SWATCH_HEIGHT};
    height: ${SWATCH_WIDTH};
    border-top-left-radius: ${theme.borderRadius.giga};
    border-top-right-radius: ${theme.borderRadius.giga};
    background-color: ${theme.colors[colorName]};
    display: inline-block;
  `};
`;

const ColorName = styled('div')`
  ${({ theme, colorName }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacings.mega};
    content: '${colorName}';
  `};
`;

const ColorHex = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.n500};
  `};
`;

const ColorWrapper = styled('div')`
  ${({ theme }) => css`
    display: inline-block;
    margin-right: ${theme.spacings.mega};
    margin-bottom: ${theme.spacings.mega};
    border-bottom-left-radius: ${theme.borderRadius.giga};
    border-bottom-right-radius: ${theme.borderRadius.giga};
    ${shadowSingle({ theme })};
  `};
`;

const Swatch = ({ colorName }) => (
  <ThemeProvider theme={standard}>
    <ColorWrapper>
      <Color colorName={colorName} />
      <ColorName>
        <ColorHex element="span" size="kilo" noMargin>
          {standard.colors[colorName]}
        </ColorHex>
        <Text bold element="span" size="kilo" noMargin>
          {colorName}
        </Text>
      </ColorName>
    </ColorWrapper>
  </ThemeProvider>
);

Swatch.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  colorName: PropTypes.string.isRequired
};

export default Swatch;
