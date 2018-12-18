/** @jsx jsx */

import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import { StyledText } from '../../../Text';

const baseStyles = ({ theme }) => css`
  label: button--link;
  box-shadow: none;
  border: none;
  background: none;
  font-weight: normal;
  padding: 0;
  color: ${theme.colors.n500};
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: ${theme.colors.n900};
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    color: ${theme.colors.p500};

    &:active {
      color: ${theme.colors.b900};
    }
  `;

const ButtonLinkWrapper = styled(StyledText.withComponent('button'))(
  baseStyles,
  primaryStyles
);

const PlainButtonWrapper = ButtonLinkWrapper.withComponent('a');

// eslint-disable-next-line react/prop-types
const PlainButton = ({ href, ...rest }) =>
  href ? (
    <PlainButtonWrapper noMargin {...{ ...rest, href }} />
  ) : (
    <ButtonLinkWrapper noMargin {...rest} />
  );

export default PlainButton;
