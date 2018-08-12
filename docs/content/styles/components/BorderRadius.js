import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import Text from '../../../../src/components/Text';
import { standard } from '../../../../src/themes';

const Box = styled('div')`
  ${({ theme, size }) => css`
    width: ${theme.spacings.tera};
    height: ${theme.spacings.tera};
    border-radius: ${theme.borderRadius[size]};
    background-color: ${theme.colors.r300};
    margin-right: ${theme.spacings.mega};
  `};
`;

const Wrapper = styled('div')`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacings.mega};
  `};
`;

const BorderRadiusSize = styled('span')`
  ${({ theme }) => css`
    color: ${theme.colors.n500};
  `};
`;

const BorderRadiusName = styled(Text)`
  ${({ theme }) => css`
    margin-left: ${theme.spacings.kilo};
    color: ${theme.colors.n500};
  `};
`;

const BorderRadius = ({ size }) => (
  <ThemeProvider theme={standard}>
    <Wrapper>
      <Box size={size} />
      <div>
        <Text element="span">{size}</Text>
        <BorderRadiusSize>
          <BorderRadiusName size={Text.KILO} element="span">
            {standard.borderRadius[size]}
          </BorderRadiusName>
        </BorderRadiusSize>
      </div>
    </Wrapper>
  </ThemeProvider>
);

BorderRadius.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired
};

export default BorderRadius;
