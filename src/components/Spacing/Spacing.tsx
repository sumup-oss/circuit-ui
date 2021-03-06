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

import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import deprecate from '../../util/deprecate';

export interface SpacingProps {
  /**
   * Adds bottom margin to component
   */
  bottom?: boolean;
  /**
   * Adds top margin to component
   */
  top?: boolean;
}

const baseStyles = () => {
  deprecate(
    [
      'The `Spacing` component has been deprecated.',
      'Use the `spacing` style mixin instead.',
      'Read more at https://github.com/sumup-oss/circuit-ui/issues/534',
    ].join(' '),
  );
  return css`
    label: spacing;
  `;
};

const marginBottomStyles = ({ theme, bottom }: SpacingProps & StyleProps) =>
  bottom &&
  css`
    label: spacing--margin-bottom;
    margin-bottom: ${theme.spacings.giga};
  `;

const marginTopStyles = ({ theme, top }: SpacingProps & StyleProps) =>
  top &&
  css`
    label: spacing--margin-top;
    margin-top: ${theme.spacings.giga};
  `;

/**
 * @deprecated Use the `spacing` style mixin instead.
 *
 * Margin helper component for default margin usage. The idea is to wrap your
 * visual components with this one in order to add top or bottom spacing based
 * on the theme variables.
 */
export const Spacing = styled('div')<SpacingProps>(
  baseStyles,
  marginBottomStyles,
  marginTopStyles,
);
