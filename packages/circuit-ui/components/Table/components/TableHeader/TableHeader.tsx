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

import {
  ThHTMLAttributes,
  FC,
  PropsWithChildren,
  EventHandler,
  KeyboardEvent,
  useRef,
} from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { ChevronRight, ChevronDown } from '@sumup/icons';

import { focusOutline, typography } from '../../../../styles/style-mixins';
import SortArrow from '../SortArrow';
import styled, { StyleProps } from '../../../../styles/styled';
import { CellAlignment, SortParams } from '../../types';
import { ClickEvent } from '../../../../types/events';
import { AccessibilityError } from '../../../../util/errors';
import IconButton from '../../../IconButton';

export interface TableHeaderProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Aligns the content of the Header with text-align.
   */
  align?: CellAlignment;
  /**
   * Adds row or col styles based on the provided Scope.
   */
  scope?: 'col' | 'row';
  /**
   * Adds sticky style to the Header based on rowHeader definition.
   */
  fixed?: boolean;
  /**
   * Adds condensed style to the Header based on the table props.
   */
  condensed?: boolean;
  /**
   * Adds active styles to the Header if it is currently hovered by sort.
   */
  isHovered?: boolean;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  onClick?: (
    event: ClickEvent<HTMLTableHeaderCellElement | HTMLButtonElement>,
  ) => void;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  sortParams?: SortParams;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  isExpandable?: boolean;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  isOpen?: boolean;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  onChevronToggle?: () => void;
}

/**
 * <th> element styles.
 */
type ThElProps = Omit<TableHeaderProps, 'sortParams'> & {
  sortable: SortParams['sortable'];
  isSorted: SortParams['isSorted'];
};

const baseStyles = ({ theme, align }: StyleProps & ThElProps) => css`
  background-color: var(--cui-bg-normal);
  border-bottom: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default},
    color ${theme.transitions.default};
`;

const hoveredStyles = ({ isHovered }: ThElProps) =>
  isHovered &&
  css`
    background-color: var(--cui-bg-normal-hovered);
  `;

const colStyles = ({ theme, scope }: StyleProps & ThElProps) =>
  scope === 'col' &&
  css`
    ${typography('two')(theme)};
    color: var(--cui-fg-subtle);
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.spacings.byte} ${theme.spacings.giga};
    vertical-align: middle;
    white-space: nowrap;
  `;

const fixedStyles = ({ theme, fixed }: StyleProps & ThElProps) =>
  fixed &&
  css`
    ${theme.mq.untilMega} {
      left: 0;
      position: sticky;
      width: 145px;
      overflow-wrap: break-word;
      z-index: ${theme.zIndex.absolute};

      &:after {
        content: '';
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.12),
          rgba(255, 255, 255, 0)
        );
        height: 100%;
        position: absolute;
        top: 0;
        left: 100%;
        width: 6px;
      }
    }
  `;

const sortableStyles = ({ sortable }: ThElProps) =>
  sortable &&
  css`
    cursor: pointer;
    position: relative;
    user-select: none;

    &:focus-within::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      ${focusOutline()};
    }

    &:focus-within,
    &:hover {
      background-color: var(--cui-bg-normal-hovered);
      color: var(--cui-fg-accent-hovered);

      & > button {
        opacity: 1;
      }
    }

    &:active {
      background-color: var(--cui-bg-normal-pressed);
      color: var(--cui-fg-accent-pressed);
    }
  `;

const sortableActiveStyles = ({ sortable, isSorted }: ThElProps) =>
  sortable &&
  isSorted &&
  css`
    & > button {
      opacity: 1;
    }
  `;

const condensedStyles = ({ condensed, theme }: StyleProps & ThElProps) =>
  condensed &&
  css`
    ${typography('two')(theme)};
    vertical-align: middle;
    padding: ${theme.spacings.kilo} ${theme.spacings.mega}
      ${theme.spacings.kilo} ${theme.spacings.giga};
  `;

const condensedColStyles = ({
  condensed,
  scope,
  theme,
}: StyleProps & ThElProps) =>
  condensed &&
  scope === 'col' &&
  css`
    padding: ${theme.spacings.byte} ${theme.spacings.mega}
      ${theme.spacings.byte} ${theme.spacings.giga};
  `;

const chevronStyles = css`
  margin: -6px 0 -6px -6px;
`;

const StyledHeader = styled('th', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<ThElProps>(
  baseStyles,
  hoveredStyles,
  fixedStyles,
  colStyles,
  sortableStyles,
  sortableActiveStyles,
  condensedStyles,
  condensedColStyles,
);

/**
 * TableHeader for the Table component. The Table handles rendering it.
 */
const TableHeader: FC<PropsWithChildren<TableHeaderProps>> = ({
  children,
  condensed,
  align = 'left',
  scope = 'col',
  fixed = false,
  isHovered = false,
  sortParams = { sortable: false },
  onClick,
  isExpandable,
  isOpen,
  onChevronToggle,
  ...props
}) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    sortParams.sortable &&
    !sortParams.sortLabel
  ) {
    throw new AccessibilityError(
      'Table',
      'The `sortLabel` prop is missing. Omit the `sortable` prop if you intend to disable the row sorting functionality.',
    );
  }
  const CheveronToShow = isOpen ? ChevronDown : ChevronRight;
  const cheveronReference = useRef<SVGSVGElement>(null);

  const onChevronKeydown: EventHandler<KeyboardEvent<SVGSVGElement>> = (e) => {
    if (e.key === 'Enter' && onChevronToggle) {
      onChevronToggle();
    }
  };

  return (
    <StyledHeader
      condensed={condensed}
      align={align}
      scope={scope}
      fixed={fixed}
      isHovered={isHovered}
      sortable={sortParams.sortable}
      isSorted={!!sortParams.isSorted}
      aria-label={sortParams.sortLabel}
      aria-sort={
        sortParams.sortable ? sortParams.sortDirection || 'none' : undefined
      }
      onClick={onClick}
      {...props}
    >
      {sortParams.sortable && (
        <SortArrow
          label={sortParams.sortLabel}
          direction={sortParams.sortDirection}
          onClick={onClick}
        />
      )}
      {isExpandable && (
        <IconButton
          style={{ padding: 0 }}
          label="expand"
          aria-label="toggle-row"
          variant="tertiary"
        >
          <CheveronToShow
            data-testid="toggle-cheveron"
            ref={cheveronReference}
            onKeyDown={onChevronKeydown}
            css={chevronStyles}
          />
        </IconButton>
      )}
      {children}
    </StyledHeader>
  );
};

export default TableHeader;
