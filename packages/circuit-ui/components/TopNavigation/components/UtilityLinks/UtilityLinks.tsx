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

import { MouseEvent, KeyboardEvent, FC, HTMLProps } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { IconProps } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled';
import { hideVisually, navigationItem } from '../../../../styles/style-mixins';
import { useClickEvent } from '../../../../hooks/useClickEvent';
import Body from '../../../Body';
import { useComponents } from '../../../ComponentsContext';
import { Skeleton } from '../../../Skeleton';

const anchorStyles = ({ theme }: StyleProps) => css`
  text-decoration: none;
  padding: ${theme.spacings.kilo};
  border-left: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  ${theme.mq.kilo} {
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  }
`;

const UtilityAnchor = styled.a(navigationItem, anchorStyles);

const iconStyles = (theme: Theme) => css`
  flex-shrink: 0;
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};

  ${theme.mq.kilo} {
    margin-right: ${theme.spacings.byte};
  }
`;

const labelStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilKilo} {
    ${hideVisually()};
  }
`;

const UtilityLabel = styled(Body)(labelStyles);

export interface UtilityLinkProps extends HTMLProps<HTMLAnchorElement> {
  /**
   * Display an icon in addition to the text to help to identify the link.
   * On narrow viewports, only the icon is displayed.
   */
  icon: FC<IconProps>;
  /**
   * Short label to describe the target of the link.
   */
  label: string;
  /**
   * A valid path or URL to the link target.
   */
  href: string;
  /**
   * Function that's called when the link is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Whether the link is the currently active page.
   */
  isActive?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

function UtilityLink({
  icon: Icon,
  label,
  onClick = () => {}, // Can't de undefined in order to trigger useClickEvent
  tracking,
  ...props
}: UtilityLinkProps) {
  const { Link } = useComponents();

  const handleClick = useClickEvent(onClick, tracking, 'utility-link');

  return (
    <UtilityAnchor
      {...props}
      onClick={handleClick}
      // @ts-expect-error The type for the `as` prop is missing in Emotion's prop types.
      as={props.href ? Link : 'button'}
    >
      <Skeleton css={iconStyles}>
        <Icon role="presentation" size="large" />
      </Skeleton>
      <Skeleton>
        <UtilityLabel
          variant={props.isActive ? 'highlight' : undefined}
          noMargin
        >
          {label}
        </UtilityLabel>
      </Skeleton>
    </UtilityAnchor>
  );
}

const UtilityLinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export interface UtilityLinksProps {
  links: UtilityLinkProps[];
}

export function UtilityLinks({ links }: UtilityLinksProps): JSX.Element {
  return (
    <UtilityLinksWrapper>
      {links.map((link) => (
        <UtilityLink key={link.label} {...link} />
      ))}
    </UtilityLinksWrapper>
  );
}
