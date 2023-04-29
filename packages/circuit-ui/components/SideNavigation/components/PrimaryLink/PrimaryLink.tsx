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

import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';
import { ArrowRight } from '@sumup/icons';

import isPropValid from '../../../../styles/is-prop-valid.js';
import styled, { StyleProps } from '../../../../styles/styled.js';
import { cx, focusVisible } from '../../../../styles/style-mixins.js';
import { EmotionAsPropType } from '../../../../types/prop-types.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import Body from '../../../Body/index.js';
import { Skeleton } from '../../../Skeleton/index.js';
import { PrimaryLinkProps as PrimaryLinkType } from '../../types.js';

export interface PrimaryLinkProps extends PrimaryLinkType {
  isOpen?: boolean;
  suffix?: ({
    className,
    role,
  }: {
    className?: string;
    role?: string;
  }) => JSX.Element;
}

type AnchorProps = Pick<PrimaryLinkProps, 'isActive' | 'isOpen'>;

const anchorStyles = ({ theme }: StyleProps) => css`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
  color: var(--cui-fg-normal);
  padding: ${theme.spacings.giga};
  transition: color ${theme.transitions.default},
    background-color ${theme.transitions.default};

  &:hover {
    background-color: var(--cui-bg-normal-hovered);
    color: var(--cui-fg-normal-hovered);
  }

  &:active {
    background-color: var(--cui-bg-normal-pressed);
    color: var(--cui-fg-normal-pressed);
  }

  &:disabled,
  &[disabled] {
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
    color: var(--cui-fg-normal-disabled);
  }

  ${theme.mq.untilTera} {
    margin-bottom: ${theme.borderWidth.kilo};

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 100%;
      right: ${theme.spacings.giga};
      left: ${theme.spacings.giga};
      width: calc(100% - 2 * ${theme.spacings.giga});
      border-bottom: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
      transition: width ${theme.transitions.default},
        right ${theme.transitions.default}, left ${theme.transitions.default};
    }
  }

  ${theme.mq.tera} {
    height: 48px;
    width: 220px;
    padding: ${theme.spacings.kilo};
    margin-bottom: ${theme.spacings.kilo};
  }
`;

const anchorActiveStyles = ({ isActive }: StyleProps & AnchorProps) =>
  isActive &&
  css`
    color: var(--cui-fg-accent);

    &:hover {
      background-color: var(--cui-bg-accent-hovered);
    }

    &:active {
      background-color: var(--cui-bg-accent-pressed);
    }
  `;

const anchorOpenStyles = ({ theme, isOpen }: StyleProps & AnchorProps) =>
  isOpen &&
  css`
    ${theme.mq.untilTera} {
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
    background-color: var(--cui-fg-promo);
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
  ${theme.mq.untilTera} {
    font-size: ${theme.typography.headline.two.fontSize};
    line-height: ${theme.typography.headline.two.lineHeight};
  }
`;

const Label = styled(Body)(labelStyles);

export function PrimaryLink({
  icon: Icon,
  label,
  isActive,
  isOpen,
  isExternal,
  suffix: Suffix,
  badge,
  secondaryGroups,
  ...props
}: PrimaryLinkProps): JSX.Element {
  const { Link } = useComponents();

  const suffix = Suffix && <Suffix css={suffixStyles} role="presentation" />;
  const isExternalLink = isExternal || props.target === '_blank';

  return (
    <Anchor
      {...props}
      isActive={isActive}
      isOpen={isOpen}
      aria-current={isActive ? 'page' : undefined}
      as={props.href ? (Link as EmotionAsPropType) : 'button'}
    >
      <Skeleton css={cx(iconStyles, badge && iconWithBadgeStyles)}>
        <Icon role="presentation" size="24" />
      </Skeleton>
      <Skeleton>
        <Label variant={isActive || isOpen ? 'highlight' : undefined} as="span">
          {label}
        </Label>
      </Skeleton>
      {/* TODO: Make this accessible to screen readers */}
      {isExternalLink && (
        <ArrowRight
          size="16"
          role="presentation"
          css={cx(suffixStyles, externalIconStyles)}
        />
      )}
      {suffix}
    </Anchor>
  );
}
