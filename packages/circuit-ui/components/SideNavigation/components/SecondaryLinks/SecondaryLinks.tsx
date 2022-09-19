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
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';
import { TrackingElement } from '@sumup/collector';

import styled, { StyleProps, NoTheme } from '../../../../styles/styled';
import { navigationItem } from '../../../../styles/style-mixins';
import { EmotionAsPropType } from '../../../../types/prop-types';
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
  flex-wrap: wrap;
  text-decoration: none;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
  word-break: break-word;
  hyphens: auto;

  ${theme.mq.tera} {
    padding: ${theme.spacings.kilo};
    padding-left: 20px;
  }
`;

const SecondaryAnchor = styled.a<NoTheme>(navigationItem, anchorStyles);

const listStyles = css`
  list-style: none;
`;

const labelStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.byte};
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
        as={props.href ? (Link as EmotionAsPropType) : 'button'}
      >
        <Skeleton css={labelStyles}>
          <Body size="one" variant={props.isActive ? 'highlight' : undefined}>
            {label}
          </Body>
        </Skeleton>
        {badge && (
          // @ts-expect-error The as prop isn't typed here, safe to ignore
          <Badge variant="promo" as="span" {...badge} />
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
