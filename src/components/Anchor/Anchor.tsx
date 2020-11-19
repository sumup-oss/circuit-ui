/**
 * Copyright 2020, SumUp Ltd.
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

import React, { HTMLProps, ReactNode, MouseEvent } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import { focusOutline } from '../../styles/style-helpers';
import { ReturnType } from '../../types/return-type';
import Text from '../Text';
import { TextProps } from '../Text/Text';
import { useComponents } from '../ComponentsContext';
import useClickHandler from '../../hooks/use-click-handler';

interface BaseProps extends TextProps {
  children: ReactNode;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the html dom element, it can be a button an anchor or a span, typed as any for now because of complex js manipulation with styled components
   */
  ref?: React.Ref<HTMLButtonElement & HTMLAnchorElement>;
}
type LinkElProps = Omit<HTMLProps<HTMLAnchorElement>, 'size'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'size'>;

export type AnchorProps = BaseProps & LinkElProps & ButtonElProps;

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  text-decoration: underline;
  text-decoration-skip-ink: auto;
  border: 0;
  outline: none;
  background: none;
  padding: 0;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  color: ${theme.colors.p500};
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.p700};
    cursor: pointer;
  }

  &:active {
    color: ${theme.colors.p900};
  }

  &:visited {
    color: ${theme.colors.v700};

    &:hover,
    &:active {
      color: ${theme.colors.v900};
    }
  }

  &:focus {
    ${focusOutline({ theme })};
    border-radius: ${theme.borderRadius.giga};
  }
`;

const StyledAnchor = styled(Text, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<AnchorProps>(baseStyles);

/**
 * The Anchor is used to display a link or button that visually looks like
 * a hyperlink. Based on the Text component, so it also supports its props.
 */
export const Anchor = React.forwardRef(
  ({ tracking, ...props }: AnchorProps, ref?: BaseProps['ref']): ReturnType => {
    const components = useComponents();

    // Need to typecast here because the StyledAnchor expects a button-like
    // component for its `as` prop. It's safe to ignore that constraint here.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const Link = components.Link as any;

    const handleClick = useClickHandler<MouseEvent<any>>(
      props.onClick,
      tracking,
      'anchor',
    );

    if (!props.href && !props.onClick) {
      return <Text as="span" {...props} ref={ref} noMargin />;
    }

    if (props.href) {
      return (
        <StyledAnchor
          {...props}
          as={Link}
          ref={ref}
          onClick={handleClick}
          noMargin
        />
      );
    }

    return (
      <StyledAnchor
        as="button"
        {...props}
        ref={ref}
        onClick={handleClick}
        noMargin
      />
    );
  },
);

Anchor.displayName = 'Anchor';
