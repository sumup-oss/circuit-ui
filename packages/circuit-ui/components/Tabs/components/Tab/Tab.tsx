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

import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';

import { typography, focusVisible } from '../../../../styles/style-mixins.js';
import styled, { NoTheme, StyleProps } from '../../../../styles/styled.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { EmotionAsPropType } from '../../../../types/prop-types.js';

export interface BaseProps {
  /**
   * Triggers selected styles of the component
   */
  selected?: boolean;
}

type LinkElProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonElProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type TabProps = BaseProps & LinkElProps & ButtonElProps;

const defaultTabStyles = ({ theme }: StyleProps) => css`
  padding: ${theme.spacings.kilo} ${theme.spacings.tera};
  color: var(--cui-fg-subtle);
  text-decoration: none;
  cursor: pointer;
  background-color: var(--cui-bg-normal);
  border: none;
  white-space: nowrap;
  height: 100%;
  align-items: center;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: none;

  &:hover {
    background-color: var(--cui-bg-normal-hovered);
  }

  &:active {
    background-color: var(--cui-bg-normal-pressed);
  }

  &[aria-selected='true'] {
    position: relative;
    color: var(--cui-fg-normal);

    &::after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: ${theme.spacings.bit};
      background: var(--cui-border-accent);
    }
  }
`;

const tabIndex = (selected: boolean) => (selected ? undefined : -1);

const StyledTab = styled('button')<NoTheme>(
  typography('one'),
  focusVisible('inset'),
  defaultTabStyles,
);

/**
 * Tab component that represents a single tab inside a Tabs wrapper
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ selected = false, ...props }, ref) => {
    const components = useComponents();
    const Link = components.Link as EmotionAsPropType;
    return (
      <StyledTab
        as={props.href ? Link : 'button'}
        ref={ref}
        role="tab"
        aria-selected={selected}
        tabIndex={tabIndex(selected)}
        {...props}
      />
    );
  },
);

Tab.displayName = 'Tab';
