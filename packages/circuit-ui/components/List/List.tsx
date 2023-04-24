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

import { forwardRef, Ref, OlHTMLAttributes } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled.js';
import { typography } from '../../styles/style-mixins';

type Size = 'one' | 'two';
type Variant = 'ordered' | 'unordered';

export interface ListProps extends OlHTMLAttributes<HTMLOListElement> {
  /**
   * A Circuit UI Body size. Should match surrounding text.
   */
  size?: Size;
  /**
   * Whether the list should be presented as an ordered or unordered list. Defaults to `unordered`.
   */
  variant?: Variant;
  /**
   The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLOListElement & HTMLUListElement>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  font-weight: ${theme.fontWeight.regular};
`;

const sizeStyles = ({ theme, size = 'one' }: ListProps & StyleProps) => {
  const sizeMap = {
    one: {
      marginBottom: theme.spacings.byte,
      paddingLeft: theme.spacings.kilo,
      marginLeft: theme.spacings.kilo,
      type: typography('one')(theme),
    },
    two: {
      marginBottom: theme.spacings.kilo,
      paddingLeft: theme.spacings.kilo,
      marginLeft: theme.spacings.bit,
      type: typography('two')(theme),
    },
  };
  const { marginBottom, paddingLeft, marginLeft, type } = sizeMap[size];
  return css`
    padding-left: ${paddingLeft};
    ${type};

    li {
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};
      &:last-child {
        margin-bottom: 0;
      }
    }

    ul,
    ol {
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};
      &:last-child {
        margin-bottom: 0;
      }
    }
  `;
};

const BaseList = styled('ul', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<ListProps>(baseStyles, sizeStyles);

/**
 * A list, which can be ordered or unordered.
 */
export const List = forwardRef(
  ({ variant, ...props }: ListProps, ref: ListProps['ref']) => (
    <BaseList as={variant === 'ordered' ? 'ol' : 'ul'} {...props} ref={ref} />
  ),
);

List.displayName = 'List';
