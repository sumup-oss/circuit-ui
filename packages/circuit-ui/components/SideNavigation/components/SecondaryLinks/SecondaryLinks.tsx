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

/* eslint-disable jsx-a11y/no-redundant-roles */

import { forwardRef, KeyboardEvent, MouseEvent, Ref } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import { TrackingElement } from '@sumup/collector';

import styled, { StyleProps } from '../../../../styles/styled';
import { navigationItem } from '../../../../styles/style-mixins';
import { useClickEvent } from '../../../../hooks/useClickEvent';
import { useFocusList, FocusProps } from '../../../../hooks/useFocusList';
import SubHeadline from '../../../SubHeadline';
import Body from '../../../Body';
import Badge from '../../../Badge';
import { useComponents } from '../../../ComponentsContext';
import { Skeleton } from '../../../Skeleton';
import { SecondaryGroupProps, SecondaryLinkProps } from '../../types';
import { TRACKING_ELEMENTS } from '../../constants';

const anchorStyles = ({ theme }: StyleProps) => css`
  text-decoration: none;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
  word-break: break-word;
  hyphens: auto;

  ${theme.mq.giga} {
    padding: ${theme.spacings.kilo} 20px;
  }
`;

const SecondaryAnchor = styled.a(navigationItem, anchorStyles);

const listStyles = css`
  list-style: none;
`;

const badgeStyles = (theme: Theme) => css`
  margin-left: ${theme.spacings.byte};
`;

function SecondaryLink({
  label,
  onClick,
  tracking,
  badge,
  ...props
}: SecondaryLinkProps) {
  const { Link } = useComponents();

  const handleClick = useClickEvent<MouseEvent | KeyboardEvent>(
    onClick,
    tracking,
    'utility-link',
  );

  return (
    <li>
      <SecondaryAnchor
        {...props}
        onClick={handleClick}
        aria-current={props.isActive ? 'page' : undefined}
        // @ts-expect-error The type for the `as` prop is missing in Emotion's prop types.
        as={props.href ? Link : 'button'}
      >
        <Skeleton>
          <Body
            size="one"
            variant={props.isActive ? 'highlight' : undefined}
            noMargin
          >
            {label}
          </Body>
        </Skeleton>
        {badge && (
          <Badge variant="promo" as="span" css={badgeStyles}>
            {badge.label}
          </Badge>
        )}
      </SecondaryAnchor>
    </li>
  );
}

const subHeadlineStyles = (theme: Theme) => css`
  margin: ${theme.spacings.tera} ${theme.spacings.mega} ${theme.spacings.byte};
`;

function SecondaryGroup({
  label,
  secondaryLinks,
  focusProps,
  trackingLabel,
}: SecondaryGroupProps & { focusProps: FocusProps }): JSX.Element {
  return (
    <TrackingElement
      name={TRACKING_ELEMENTS.SECONDARY_NAVIGATION_GROUP}
      label={trackingLabel}
    >
      <li>
        {label && (
          <Skeleton css={subHeadlineStyles}>
            <SubHeadline as="h3" noMargin>
              {label}
            </SubHeadline>
          </Skeleton>
        )}
        <ul role="list" css={listStyles}>
          {secondaryLinks.map((link) => (
            <SecondaryLink key={link.label} {...link} {...focusProps} />
          ))}
        </ul>
      </li>
    </TrackingElement>
  );
}

export interface SecondaryLinksProps {
  secondaryGroups: SecondaryGroupProps[];
  trackingLabel?: string;
}

export const SecondaryLinks = forwardRef(
  (
    { secondaryGroups, trackingLabel, ...props }: SecondaryLinksProps,
    ref: Ref<HTMLUListElement>,
  ): JSX.Element => {
    const focusProps = useFocusList();
    return (
      <TrackingElement
        name={TRACKING_ELEMENTS.SECONDARY_NAVIGATION}
        label={trackingLabel}
      >
        <ul role="list" ref={ref} css={listStyles} {...props}>
          {secondaryGroups.map((group, index) => (
            <SecondaryGroup key={index} {...group} focusProps={focusProps} />
          ))}
        </ul>
      </TrackingElement>
    );
  },
);

SecondaryLinks.displayName = 'SecondaryLinks';
