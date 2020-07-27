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

/** @jsx jsx */
import { forwardRef, HTMLProps, Ref, FC, SVGProps, MouseEvent } from 'react';
import { css, jsx } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { textMega, focusOutline } from '../../styles/style-helpers';
import useClickHandler from '../../hooks/use-click-handler';
import { CloseButton, CloseButtonProps } from '../CloseButton/CloseButton';

interface BaseProps {
  /**
   * Render prop that should render a leading-aligned icon or element.
   */
  prefix?: FC<SVGProps<SVGSVGElement>>;
  /**
   * Render prop that should render a trailing-aligned icon or element.
   */
  suffix?: FC<SVGProps<SVGSVGElement>>;
  /**
   * Renders a close button inside the tag and calls the provided function
   * when the button is clicked.
   */
  onRemove?: (event: MouseEvent) => void;
  /**
   * Text label for the remove icon for screen readers.
   * Important for accessibility.
   */
  labelRemoveButton?: string;
  /**
   * Triggers selected styles on the tag.
   */
  selected?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   *  The ref to the DOM element
   */
  ref?: Ref<HTMLDivElement & HTMLButtonElement>;
}

type DivElProps = Omit<HTMLProps<HTMLDivElement>, 'prefix'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'prefix'>;

export type TagProps = BaseProps & DivElProps & ButtonElProps;

const BORDER_WIDTH = '1px';

type TagElProps = Omit<TagProps, 'prefix' | 'suffix' | 'labelRemoveButton'> & {
  removable: boolean;
};

const tagBaseStyles = ({ theme }: StyleProps) => css`
  label: tag;
  display: inline-flex;
  align-items: center;
  ${textMega({ theme })};
  border: ${BORDER_WIDTH} solid ${theme.colors.n300};
  border-radius: ${theme.borderRadius.giga};
  padding: ${theme.spacings.bit} ${theme.spacings.kilo};
  cursor: default;
  background-color: ${theme.colors.white};
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};
`;

const tagRemovableStyles = ({ theme, removable }: StyleProps & TagElProps) =>
  removable &&
  css`
    label: tag--removable;
    padding-right: calc(${theme.spacings.bit} + ${theme.spacings.tera});
  `;

const tagClickableStyles = ({ theme, onClick }: StyleProps & TagElProps) =>
  onClick &&
  css`
    label: tag--clickable;
    cursor: pointer;
    outline: 0;

    &:active {
      color: ${theme.colors.bodyColor};
    }

    &:hover {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors.n500};
    }

    &:focus {
      ${focusOutline({ theme })};
    }
  `;

const tagSelectedStyles = ({ theme, selected }: StyleProps & TagElProps) =>
  selected &&
  css`
    label: tag--selected;
    background-color: ${theme.colors.p500};
    border-color: ${theme.colors.p700};
    color: ${theme.colors.white};
  `;

const tagSelectedClickableStyles = ({
  theme,
  selected,
  onClick,
}: StyleProps & TagElProps) =>
  selected &&
  onClick &&
  css`
    label: tag--selected--clickable;

    &:active {
      color: ${theme.colors.white};
    }

    &:hover {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p700};
    }
  `;

const TagElement = styled('div')<TagElProps>(
  tagBaseStyles,
  tagRemovableStyles,
  tagClickableStyles,
  tagSelectedStyles,
  tagSelectedClickableStyles,
);

const prefixStyles = (theme: Theme) => css`
  label: tag__prefix;
  margin-left: -${theme.spacings.bit};
  margin-right: ${theme.spacings.bit};
`;

const suffixStyles = (theme: Theme) => css`
  label: tag__suffix;
  margin-left: ${theme.spacings.bit};
  margin-right: -${theme.spacings.bit};
`;

const closeButtonStyles = ({ theme }: StyleProps) => css`
  label: tag__close-button;
  position: absolute;
  top: ${BORDER_WIDTH};
  right: ${BORDER_WIDTH};
  border-radius: ${theme.borderRadius.mega};
`;

const RemoveButton = styled(CloseButton)<CloseButtonProps>(closeButtonStyles);

const Container = styled.div`
  label: tag__container;
  position: relative;
`;

const TagComponent = (
  {
    children,
    prefix: Prefix,
    suffix: Suffix,
    onRemove,
    labelRemoveButton = 'Remove',
    selected,
    onClick,
    tracking,
    ...props
  }: TagProps,
  ref: BaseProps['ref'],
) => {
  const as = onClick ? 'button' : 'div';
  const handleClick = useClickHandler<MouseEvent<any>>(
    onClick,
    tracking,
    'tag',
  );
  const removable = Boolean(onRemove);

  return (
    <Container>
      <TagElement
        removable={removable}
        selected={selected}
        onClick={handleClick}
        as={as}
        ref={ref}
        {...props}
      >
        {Prefix && <Prefix css={prefixStyles} />}

        {children}

        {Suffix && <Suffix css={suffixStyles} />}
      </TagElement>

      {removable && (
        <RemoveButton
          variant={selected ? 'primary' : 'secondary'}
          selected={selected}
          label={labelRemoveButton}
          data-testid="tag-close"
          size="kilo"
          onClick={onRemove}
          tracking={{
            component: 'tag-remove',
            ...tracking,
          }}
        />
      )}
    </Container>
  );
};

export const Tag = forwardRef(TagComponent);
