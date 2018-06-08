import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Text from '../Text';

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

/**
 * Describe your component here.
 */
const ButtonLinkWrapper = styled(Text)(baseStyles, primaryStyles);

ButtonLinkWrapper.detaultProps = Text.detaultProps;

const ButtonLink = ({ href, ...rest }) => (
  <ButtonLinkWrapper {...rest} element={href ? 'a' : 'button'} noMargin />
);

ButtonLink.KILO = Text.KILO;
ButtonLink.MEGA = Text.MEGA;
ButtonLink.GIGA = Text.GIGA;

ButtonLink.propTypes = {
  /**
   * Renders a primary button using the brand color.
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
  size: PropTypes.oneOf([ButtonLink.KILO, ButtonLink.MEGA, ButtonLink.GIGA])
};

ButtonLink.defaultProps = {
  primary: false,
  href: undefined,
  size: Text.KILO,
  target: undefined
};

/**
 * @component
 */
export default ButtonLink;
