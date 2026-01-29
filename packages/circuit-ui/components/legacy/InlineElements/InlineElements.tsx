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

/** @jsxImportSource @emotion/react */

import { Children, type ReactElement } from 'react';
import { css } from '@emotion/react';

import styled from '../../../styles/styled.js';
import { clearfix } from '../../../styles/style-mixins.js';

export interface InlineElementsProps {
  /**
   * The child elements to be displayed inline.
   */
  children: ReactElement | ReactElement[];
  /**
   * Let's children take up widths according to given ratios. The ratios are
   * equivalent to the flex-grow parameter, which they are used with.
   */
  ratios?: number[];
  /**
   * Forces inline display even on mobile.
   */
  inlineMobile?: boolean;
}

const fallbackBaseStyles = ({ children }: InlineElementsProps) => {
  const childrenCount = Children.count(children);

  return css`
    > * {
      display: block;
      width: 100%;
    }
    @media (min-width: 480px) {
      > * {
        float: left;
        width: ${(1 / childrenCount) * 95}%;
        width: calc((100% - ${childrenCount - 1} * var(--cui-spacings-byte)) / ${childrenCount});
      }
      ${clearfix()};
    }
  `;
};

const baseStyles = ({ ratios = [], children }: InlineElementsProps) => {
  const flexGrows =
    ratios.length &&
    Children.map(
      children,
      (_, childIndex) => `
        > :nth-child(${childIndex + 1}) {
          flex-grow: ${ratios[childIndex] || 1};
          width: auto;
        }
      `,
    ).join('\n');

  return css`
    display: flex;
    flex-direction: column;
    width: 100%;

    > * {
      &:not(:last-of-type) {
        margin-bottom: var(--cui-spacings-byte);
      }
    }

    @media (min-width: 480px) {
      align-items: stretch;
      flex-direction: row;
      justify-content: stretch;

      > * {
        flex-grow: 1;
        width: auto;

        &:not(:last-of-type) {
          margin-bottom: 0;
          margin-right: var(--cui-spacings-byte);
        }
      }

      ${flexGrows};
    }
  `;
};

const fallbackInlineMobileStyles = ({
  inlineMobile,
  children,
}: InlineElementsProps) => {
  if (!inlineMobile) {
    return null;
  }

  const childrenCount = Children.count(children);

  return css`
    @media (max-width: 479px) {
      > * {
        float: left;
        width: ${(1 / childrenCount) * 95}%;
        width: calc((100% - ${childrenCount - 1} * var(--cui-spacings-byte)) / ${childrenCount});
      }
      ${clearfix()};
    }
  `;
};

const inlineMobileStyles = ({ inlineMobile }: InlineElementsProps) =>
  inlineMobile &&
  css`
    @media (max-width: 479px) {
      flex-direction: row;
      flex-grow: 1;
      width: auto;

      > * {
        &:not(:last-of-type) {
          margin-bottom: 0;
          margin-right: var(--cui-spacings-byte);
        }
      }
    }
  `;

/**
 * @deprecated Use [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) or [CSS Grid](https://css-tricks.com/css-grid-layout-guide/) instead.
 *
 * Layout helper that displays child elements inline. Useful for form elements.
 */
export const InlineElements = styled('div')<InlineElementsProps>(
  fallbackBaseStyles,
  baseStyles,
  fallbackInlineMobileStyles,
  inlineMobileStyles,
);
