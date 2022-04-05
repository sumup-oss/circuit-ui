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

// TODO: Improve types
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useState, useEffect, ReactElement } from 'react';
import { css } from '@emotion/react';
import { TrackingElement } from '@sumup/collector';

import { ClickEvent } from '../../../../types/events';
import { isEmpty } from '../../../../util/helpers';
import styled, { StyleProps } from '../../../../styles/styled';
import { useClickEvent, TrackingProps } from '../../../../hooks/useClickEvent';
import { Child, hasSelectedChild, getIcon } from '../../SidebarService';
import { SubNavList } from '../SubNavList';
import { NavLabel } from '../NavLabel';

export interface AggregatorProps {
  /**
   * The children component passed to the NavAggregator
   */
  children: Child | Child[];
  /**
   * The label of NavAggregator
   */
  label: string;
  /**
   * The icon to be shown when the NavAggregator is not selected
   */
  defaultIcon?: ReactElement;
  /**
   * The icon to be shown when the NavAggregator is selected
   */
  selectedIcon?: ReactElement;
  /**
   * Disables the Aggregator and all children
   */
  disabled?: boolean;
  /**
   * The onClick method to handle the click event on the NavAggregator
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Additional data that is dispatched with click tracking event.
   */
  tracking?: TrackingProps;
}

type Disabled = { disabled?: boolean };
type Selected = { selected: boolean };

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: auto;
  width: calc(100% - (2 * ${theme.spacings.mega}));
  margin: ${theme.spacings.mega};
  padding: ${theme.spacings.bit};
  cursor: pointer;
  color: ${theme.colors.n300};
  transition: color ${theme.transitions.default};
  font: inherit;
  background: none;
  border: 0;
  outline: none;
`;

const hoverStyles = ({
  theme,
  disabled,
  selected,
}: StyleProps & Disabled & Selected) =>
  !disabled &&
  !selected &&
  css`
    &:hover,
    &:focus {
      color: ${theme.colors.n100};
    }
  `;

const selectedStyles = ({ theme, selected }: StyleProps & Selected) =>
  selected &&
  css`
    color: ${theme.colors.white};
  `;

const disabledStyles = ({ theme, disabled }: StyleProps & Disabled) =>
  disabled &&
  css`
    cursor: not-allowed;
    color: ${theme.colors.n500};
  `;

const AggregatorContainer = styled('button')<Disabled & Selected>(
  baseStyles,
  hoverStyles,
  selectedStyles,
  disabledStyles,
);

const TRACKING_ELEMENT = 'aggregator';

export function Aggregator({
  children,
  label,
  defaultIcon,
  selectedIcon,
  disabled,
  onClick,
  tracking,
  ...props
}: AggregatorProps): JSX.Element {
  if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !label
  ) {
    throw new Error(
      'The Aggregator component is missing a `label` prop. This is an accessibility requirement.',
    );
  }
  const [isOpen, setIsOpen] = useState(false);
  const selectedChild = hasSelectedChild(children);
  const baseHandleClick = (event: ClickEvent) => {
    if (onClick) {
      onClick(event);
    }

    if (selectedChild) {
      return;
    }

    setIsOpen((open) => !open);
  };
  const handleClick = useClickEvent(
    baseHandleClick,
    tracking,
    'sidebar-nav-aggregator',
  );

  useEffect(() => {
    setIsOpen(selectedChild);
  }, [selectedChild]);

  const icon = getIcon({
    selected: selectedChild,
    selectedIcon,
    defaultIcon,
    disabled,
  });

  return (
    <li>
      <AggregatorContainer
        selected={selectedChild}
        disabled={disabled}
        aria-disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {icon}
        <NavLabel secondary={false}>{label}</NavLabel>
      </AggregatorContainer>
      {!isEmpty(children) && !disabled && (
        <TrackingElement name={TRACKING_ELEMENT}>
          <SubNavList visible={isOpen}>{children}</SubNavList>
        </TrackingElement>
      )}
    </li>
  );
}
