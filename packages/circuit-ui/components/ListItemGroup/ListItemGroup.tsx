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

import { ReactElement, forwardRef, Ref, HTMLProps, ReactNode } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { ReturnType } from '../../types/return-type';
import { ListItemProps } from '../ListItem';

interface BaseProps {
  /**
   * Children of type ListItem.
   */
  children: ReactElement<ListItemProps>[] | ReactElement<ListItemProps>;
  /**
   * Display a main label for this group of list items.
   */
  title?: ReactNode;
  /**
   * Display a secondary label for this group of list items.
   */
  suffix?: ReactNode;
  /**
   The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement>;
}

export type ListItemGroupProps = BaseProps & HTMLProps<HTMLDivElement>;

const baseStyles = css`
  display: flex;
  flex-direction: column;
`;

const StyledListItemGroup = styled.div(baseStyles);

const headerContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  display: flex;
  justify-content: flex-end;
  margin: 0 ${theme.spacings.mega} ${theme.spacings.byte};
`;

const HeaderContainer = styled.div(headerContainerStyles);

const titleContainerStyles = css`
  flex: auto;
`;

const TitleContainer = styled.div(titleContainerStyles);

const suffixContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  align-self: flex-end;
  margin-left: ${theme.spacings.mega};
`;

const SuffixContainer = styled.div(suffixContainerStyles);

const itemsContainerStyles = ({ theme }: StyleProps) => css`
  flex: auto;
  display: flex;
  flex-direction: column;
  border: ${theme.borderWidth.mega} solid ${theme.colors.n200};
  border-radius: ${theme.borderRadius.mega};

  & > [role='listitem'] {
    border: none;
    border-radius: calc(${theme.borderRadius.mega} - ${theme.borderWidth.mega});

    &:not(:first-of-type) > div:last-of-type {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: -${theme.spacings.kilo};
        left: 0; // TODO: handle items without icon
        right: -${theme.spacings.mega};
        border-top: ${theme.borderWidth.kilo} solid ${theme.colors.n200};
      }
    }

    &:hover,
    &:hover + [role='listitem'],
    &:active,
    &:active + [role='listitem'],
    &[data-selected='true'],
    &[data-selected='true'] + [role='listitem'],
    &:focus-visible,
    &:focus-visible + [role='listitem'] {
      & > div:last-of-type:before {
        border-top: none;
      }
    }
  }
`;

const ItemsContainer = styled.div(itemsContainerStyles);

/**
 * The ListItemGroup component enables the user to render a named list of ListItem components.
 */
export const ListItemGroup = forwardRef(
  (
    { children, title, suffix, ...props }: ListItemGroupProps,
    ref?: BaseProps['ref'],
  ): ReturnType => (
    <StyledListItemGroup {...props} ref={ref}>
      {(title || suffix) && (
        <HeaderContainer>
          {title && <TitleContainer>{title}</TitleContainer>}
          {suffix && <SuffixContainer>{suffix}</SuffixContainer>}
        </HeaderContainer>
      )}
      <ItemsContainer role="list">{children}</ItemsContainer>
    </StyledListItemGroup>
  ),
);

ListItemGroup.displayName = 'ListItemGroup';
