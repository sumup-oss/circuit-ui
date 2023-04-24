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

import { useState, useEffect, ReactElement } from 'react';
import { css } from '@emotion/react';

import { ClickEvent } from '../../../../types/events.js';
import { isEmpty } from '../../../../util/helpers.js';
import styled, { StyleProps } from '../../../../styles/styled.js';
import { Child, hasSelectedChild, getIcon } from '../../SidebarService.jsx';
import { SubNavList } from '../SubNavList';
import { NavLabel } from '../NavLabel';
import { AccessibilityError } from '../../../../util/errors.js';

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

export function Aggregator({
  children,
  label,
  defaultIcon,
  selectedIcon,
  disabled,
  onClick,
  ...props
}: AggregatorProps): JSX.Element {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !label
  ) {
    throw new AccessibilityError('Aggregator', 'The `label` prop is missing.');
  }
  const [isOpen, setIsOpen] = useState(false);
  const selectedChild = hasSelectedChild(children);
  const handleClick = (event: ClickEvent) => {
    if (onClick) {
      onClick(event);
    }

    if (selectedChild) {
      return;
    }

    setIsOpen((open) => !open);
  };

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
        <SubNavList visible={isOpen}>{children}</SubNavList>
      )}
    </li>
  );
}
