import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import Text from '../../../../src/components/Text';
import { standard } from '../../../../src/themes';

const Box = styled('div')`
  ${({ theme, spacingName }) => css`
    width: ${theme.spacings[spacingName]};
    height: ${theme.spacings[spacingName]};
    border-radius: ${theme.borderRadius.kilo};
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

const SpacingSize = styled('span')`
  ${({ theme }) => css`
    color: ${theme.colors.n500};
  `};
`;

const SpacingName = styled(Text)`
  ${({ theme }) => css`
    margin-left: ${theme.spacings.kilo};
    color: ${theme.colors.n500};
  `};
`;

const Spacing = ({ spacingName }) => (
  <ThemeProvider theme={standard}>
    <Wrapper>
      <Box spacingName={spacingName} />
      <div>
        <Text element="span">{spacingName}</Text>
        <SpacingSize>
          <SpacingName size={Text.KILO} element="span">
            {standard.spacings[spacingName]}
          </SpacingName>
        </SpacingSize>
      </div>
    </Wrapper>
  </ThemeProvider>
);

Spacing.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  spacingName: PropTypes.string.isRequired
};

export default Spacing;
