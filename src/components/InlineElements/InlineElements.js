/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Children } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearfix } from '../../styles/style-helpers';

const fallbackBaseStyles = ({ children, theme }) => {
  const childrenCount = Children.count(children);

  return css`
    label: inline-elements--fallback;

    > * {
      display: block;
      width: 100%;
    }

    ${theme.mq.kilo} {
      > * {
        float: left;
        width: ${(1 / childrenCount) * 95}%;
        width: calc(
          (100% - ${childrenCount - 1} * ${theme.spacings.byte}) /
            ${childrenCount}
        );
      }

      ${clearfix()};
    }
  `;
};

const baseStyles = ({ theme, ratios, children }) => {
  const flexGrows =
    ratios.length &&
    Children.map(
      children,
      (child, childIndex) => `
        > :nth-child(${childIndex + 1}) {
          flex-grow: ${ratios[childIndex] || 1};
          width: auto;
        }
      `
    ).join('\n');

  return css`
    label: inline-elements;
    display: flex;
    flex-direction: column;
    width: 100%;

    > * {
      &:not(:last-of-type) {
        margin-bottom: ${theme.spacings.byte};
      }
    }

    ${theme.mq.kilo} {
      align-items: stretch;
      flex-direction: row;
      justify-content: stretch;

      > * {
        flex-grow: 1;
        width: auto;

        &:not(:last-of-type) {
          margin-bottom: 0;
          margin-right: ${theme.spacings.byte};
        }
      }

      ${flexGrows};
    }
  `;
};

const fallbackInlineMobileStyles = ({ theme, inlineMobile, children }) => {
  if (!inlineMobile) {
    return null;
  }

  const childrenCount = Children.count(children);

  return css`
    label: inline-elements--inline-mobile-fallback;

    ${theme.mq.untilKilo} {
      > * {
        float: left;
        width: ${(1 / childrenCount) * 95}%;
        width: calc(
          (100% - ${childrenCount - 1} * ${theme.spacings.byte}) /
            ${childrenCount}
        );
      }

      ${clearfix()};
    }
  `;
};

const inlineMobileStyles = ({ theme, inlineMobile }) =>
  inlineMobile &&
  css`
    label: inline-elements--inline-mobile;

    ${theme.mq.untilKilo} {
      flex-direction: row;
      flex-grow: 1;
      width: auto;

      > * {
        &:not(:last-of-type) {
          margin-bottom: 0;
          margin-right: ${theme.spacings.byte};
        }
      }
    }
  `;

/**
 * Layout helper that displays elements inline. Useful for
 * form elements.
 */
const InlineElements = styled('div')(
  fallbackBaseStyles,
  baseStyles,
  fallbackInlineMobileStyles,
  inlineMobileStyles
);

InlineElements.propTypes = {
  /**
   * The child elements to be displayed inline.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /**
   * Forces inline display even on mobile.
   */
  inlineMobile: PropTypes.bool,
  /**
   * Let's children take up widths according to
   * given ratios. The ratios are equivalent
   * to the flex-grow parameter, which they are
   * used with.
   */
  ratios: PropTypes.arrayOf(PropTypes.number)
};

InlineElements.defaultProps = {
  inlineMobile: false,
  ratios: []
};

/**
 * @component
 */
export default InlineElements;
