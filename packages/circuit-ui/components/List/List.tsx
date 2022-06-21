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

import styled, { StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';
import { DeprecationError } from '../../util/errors';

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
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
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

const marginStyles = ({
  theme,
  noMargin,
  size = 'one',
}: StyleProps & ListProps) => {
  if (!noMargin) {
    const sizeMap = {
      one: theme.spacings.byte,
      two: theme.spacings.kilo,
    };
    return css`
      margin-bottom: ${theme.spacings.mega};

      li:last-child,
      ul:last-child,
      ol:last-child {
        margin-bottom: ${sizeMap[size]};
      }
    `;
  }
  return null;
};

const BaseList = styled('ul', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<ListProps>(baseStyles, sizeStyles, marginStyles);

/**
 * A list, which can be ordered or unordered.
 */
export const List = forwardRef(
  ({ variant, ...props }: ListProps, ref: ListProps['ref']) => {
    if (
      process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !props.noMargin
    ) {
      throw new DeprecationError(
        'List',
        'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      );
    }
    return (
      <BaseList as={variant === 'ordered' ? 'ol' : 'ul'} {...props} ref={ref} />
    );
  },
);

List.displayName = 'List';
