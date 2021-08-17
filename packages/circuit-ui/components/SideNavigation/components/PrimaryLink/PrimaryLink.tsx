/**
 * Copyright 2021, SumUp Ltd.
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

import { FC } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@sumup/design-tokens';
import { ArrowRight } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled';
import {
  focusVisible,
  disableVisually,
  cx,
} from '../../../../styles/style-mixins';
import { useClickEvent } from '../../../../hooks/useClickEvent';
import { ClickEvent } from '../../../../types/events';
import { useComponents } from '../../../ComponentsContext';
import Body from '../../../Body';
import { Skeleton } from '../../../Skeleton';
import { PrimaryLinkProps as PrimaryLinkType } from '../../types';

export interface PrimaryLinkProps extends PrimaryLinkType {
  isOpen?: boolean;
  suffix?: FC<{ className?: string; role?: string }>;
}

type AnchorProps = Pick<PrimaryLinkProps, 'isActive' | 'isOpen'>;

const anchorStyles = ({ theme }: StyleProps) => css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
  color: ${theme.colors.black};
  padding: ${theme.spacings.giga};
  transition: color ${theme.transitions.default},
    background-color ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.n100};
  }

  &:active {
    background-color: ${theme.colors.n200};
  }

  &:disabled {
    ${disableVisually()};
  }

  ${theme.mq.untilGiga} {
    margin-bottom: ${theme.borderWidth.kilo};

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 100%;
      right: ${theme.spacings.giga};
      left: ${theme.spacings.giga};
      width: calc(100% - 2 * ${theme.spacings.giga});
      border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
      transition: width ${theme.transitions.default},
        right ${theme.transitions.default}, left ${theme.transitions.default};
    }
  }

  ${theme.mq.giga} {
    padding: ${theme.spacings.kilo};
    margin-bottom: ${theme.spacings.kilo};
  }
`;

const anchorActiveStyles = ({ theme, isActive }: StyleProps & AnchorProps) =>
  isActive &&
  css`
    color: ${theme.colors.p500};

    &:hover {
      background-color: ${theme.colors.p100};
    }
  `;

const anchorOpenStyles = ({ theme, isOpen }: StyleProps & AnchorProps) =>
  isOpen &&
  css`
    ${theme.mq.untilGiga} {
      &::after {
        right: 0;
        left: 0;
        width: 100%;
      }
    }
  `;

const Anchor = styled('a', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<AnchorProps>(
  focusVisible('inset'),
  anchorStyles,
  anchorActiveStyles,
  anchorOpenStyles,
);

const iconStyles = (theme: Theme) => css`
  position: relative;
  flex-shrink: 0;
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};
  margin-right: ${theme.spacings.kilo};
`;

const iconWithBadgeStyles = (theme: Theme) => css`
  &::before {
    display: block;
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    width: 10px;
    height: 10px;
    background-color: ${theme.colors.v500};
    border-radius: ${theme.borderRadius.circle};
  }
`;

const suffixStyles = (theme: Theme) => css`
  flex-shrink: 0;
  width: ${theme.iconSizes.kilo};
  height: ${theme.iconSizes.kilo};
  margin-left: auto;
  transition: transform ${theme.transitions.default};
`;

const externalIconStyles = css`
  transform: rotate(-45deg);
`;

const labelStyles = ({ theme }: StyleProps) => css`
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${theme.mq.untilGiga} {
    font-size: ${theme.typography.headline.two.fontSize};
    line-height: ${theme.typography.headline.two.lineHeight};
  }

  ${theme.mq.giga} {
    max-width: 160px; /* max-width - icon-width - margin-right */
  }
`;

const Label = styled(Body)(labelStyles);

export function PrimaryLink({
  icon: Icon,
  label,
  onClick,
  isActive,
  isOpen,
  isExternal,
  suffix: Suffix,
  badge,
  tracking,
  secondaryGroups,
  ...props
}: PrimaryLinkProps): JSX.Element {
  const { Link } = useComponents();

  const handleClick = useClickEvent<ClickEvent>(
    onClick,
    tracking,
    'primary-link',
  );

  const suffix = Suffix && <Suffix css={suffixStyles} role="presentation" />;
  const isExternalLink = isExternal || props.target === '_blank';

  return (
    <Anchor
      {...props}
      onClick={handleClick}
      isActive={isActive}
      isOpen={isOpen}
      aria-current={isActive ? 'page' : undefined}
      // @ts-expect-error The type for the `as` prop is missing in Emotion's prop types.
      as={props.href ? Link : 'button'}
    >
      <Skeleton css={cx(iconStyles, badge && iconWithBadgeStyles)}>
        <Icon role="presentation" size="large" />
      </Skeleton>
      <Skeleton>
        <Label
          variant={isActive || isOpen ? 'highlight' : undefined}
          as="span"
          noMargin
        >
          {label}
        </Label>
      </Skeleton>
      {/* TODO: Make this accessible to screen readers */}
      {isExternalLink && (
        <ArrowRight
          role="presentation"
          css={cx(suffixStyles, externalIconStyles)}
        />
      )}
      {suffix}
    </Anchor>
  );
}
