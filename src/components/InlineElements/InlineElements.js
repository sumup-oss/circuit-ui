import { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { clearfix } from '../../styles/style-helpers';

const fallbackBaseStyles = ({ children, theme }) => {
  const childrenCount = Children.count(children);

  return css`
    label: inline-elements--fallback;

    > * {
      display: block;
      width: 100%;
    }

    ${theme.mq.medium`
      > * {
        float: left;
        width: ${1 / childrenCount * 95}%;
        width: calc(
           (100% - ${childrenCount - 1} * ${theme.spacings.byte}) /
            ${childrenCount}
        );
      }

      ${clearfix};
    `};
  `;
};

const baseStyles = ({ theme }) => css`
  label: inline-elements;
  display: flex;
  flex-direction: column;
  width: 100%;

  > * {
    &:not(:last-of-type) {
      margin-bottom: ${theme.spacings.byte};
    }
  }

  ${theme.mq.medium`
    align-items: center;
    flex-direction: row;

    > * {
      flex-grow: 1;
      width: auto;

      &:not(:last-of-type) {
        margin-bottom: 0;
        margin-right: ${theme.spacings.byte};
      }
    }
  `};
`;

const fallbackInlineMobileStyles = ({ theme, inlineMobile, children }) => {
  if (!inlineMobile) {
    return null;
  }

  const childrenCount = Children.count(children);

  return css`
    label: inline-elements--inline-mobile-fallback;

    ${theme.mq.untilMedium`
      > * {
        float: left;
        width: ${1 / childrenCount * 95}%;
        width: calc(
           (100% - ${childrenCount - 1} * ${theme.spacings.byte}) /
            ${childrenCount}
        );
      }

      ${clearfix};
    `};
  `;
};

const inlineMobileStyles = ({ theme, inlineMobile }) =>
  inlineMobile &&
  css`
    label: inline-elements--inline-mobile;

    ${theme.mq.untilMedium`
      flex-direction: row;
      flex-grow: 1;
      width: auto;

      > * {
        &:not(:last-of-type) {
          margin-bottom: 0;
          margin-right: ${theme.spacings.byte};
        }
      }
    `};
  `;

/**
 * Layout helper that displays elements inline. Useful for
 * form elements.
 */
const InlineElements = styled('div')(
  baseStyles,
  fallbackBaseStyles,
  inlineMobileStyles,
  fallbackInlineMobileStyles
);

InlineElements.propTypes = {
  /**
   * The child elements to be displayed inline.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /**
   * Forces inline display even on mobile.
   */
  inlineMobile: PropTypes.bool
};

InlineElements.defaultProps = {
  inlineMobile: false
};

/**
 * @component
 */
export default InlineElements;
