import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { StyledText } from '../Text';

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
ButtonLinkWrapper.detaultProps = Text.detaultProps;

const TextLinkWrapper = ButtonLinkWrapper.withComponent('a');
TextLinkWrapper.detaultProps = Text.detaultProps;

/**
 * A anchor or button component that looks like text.
 */
const TextLink = ({ href, ...rest }) =>
  href ? (
    <TextLinkWrapper noMargin {...{ ...rest, href }} />
  ) : (
    <ButtonLinkWrapper noMargin {...rest} />
  );

TextLink.KILO = StyledText.KILO;
TextLink.MEGA = StyledText.MEGA;
TextLink.GIGA = StyledText.GIGA;

TextLink.propTypes = {
  /**
   * Renders a primary variant using the brand color.
   */
  primary: PropTypes.bool,
  /**
   * URL the Button should lead to. Causes the Button to render an <a> tag.
   */
  href: PropTypes.string,
  /**
   * Link target. Should only be passed, if href is passed, too.
   */
  target: PropTypes.string,
  /**
   * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
   */
  size: PropTypes.oneOf([TextLink.KILO, TextLink.MEGA, TextLink.GIGA])
};

TextLink.defaultProps = {
  primary: false,
  href: undefined,
  size: TextLink.MEGA,
  target: undefined
};

/**
 * @component
 */
export default TextLink;
