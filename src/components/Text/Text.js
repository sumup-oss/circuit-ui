import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';
import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const mobileSizeMap = {
  [KILO]: KILO,
  [MEGA]: MEGA,
  [GIGA]: MEGA
};

const baseStyles = ({ theme }) => css`
  label: text;
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

const sizeStyles = ({ theme, size }) =>
  css`
    label: text--${size};
    font-size: ${theme.typography.text[mobileSizeMap[size]].fontSize};
    line-height: ${theme.typography.text[mobileSizeMap[size]].lineHeight};

    ${theme.mq.kilo`
      font-size: ${theme.typography.text[size].fontSize};
      line-height: ${theme.typography.text[size].lineHeight};
    `};
  `;

const boldStyles = ({ theme, bold }) =>
  bold &&
  css`
    label: text--bold;
    font-weight: ${theme.fontWeight.bold};
  `;

const italicStyles = ({ italic }) =>
  italic &&
  css`
    label: text--italic;
    font-style: italic;
  `;

const marginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;

const StyledText = styled(HtmlElement)`
  ${baseStyles};
  ${sizeStyles};
  ${marginStyles};
  ${boldStyles};
  ${italicStyles};
`;

export { StyledText };

/**
 * The Text component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements. Capable of rendering
 * using different HTML tags.
 */
const Text = ({ blacklist, ...restProps }) => (
  <StyledText
    {...restProps}
    blacklist={{
      ...blacklist,
      size: true,
      bold: true,
      italic: true,
      noMargin: true
    }}
  />
);

Text.KILO = KILO;
Text.MEGA = MEGA;
Text.GIGA = GIGA;

Text.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf([Text.KILO, Text.MEGA, Text.GIGA]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin: PropTypes.bool,
  /**
   * Bolds the text.
   */
  bold: PropTypes.bool,
  /**
   * Bolds the text.
   */
  italic: PropTypes.bool,
  /**
   * The HTML element to render.
   */
  element: PropTypes.string,
  /**
   * A hash of props that should not be forwarded as attributes to the HTML element.
   * Prevents React from complaining about invalid attribute values.
   */
  blacklist: PropTypes.objectOf(PropTypes.bool)
};

Text.defaultProps = {
  element: 'p',
  blacklist: {},
  size: Text.MEGA,
  className: '',
  noMargin: false,
  bold: false,
  italic: false,
  children: null
};

/**
 * @component
 */
export default Text;
