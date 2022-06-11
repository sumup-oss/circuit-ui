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

import { MouseEvent, KeyboardEvent, FC, AnchorHTMLAttributes } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';
import { IconProps } from '@sumup/icons';

import styled, { NoTheme, StyleProps } from '../../../../styles/styled.js';
import {
  hideVisually,
  navigationItem,
} from '../../../../styles/style-mixins.js';
import { EmotionAsPropType } from '../../../../types/prop-types.js';
import Body from '../../../Body/index.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { Skeleton } from '../../../Skeleton/index.js';

const anchorStyles = ({ theme }: StyleProps) => css`
  text-decoration: none;
  height: 100%;
  padding: 0 ${theme.spacings.mega};
  border-left: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
`;

const UtilityAnchor = styled.a<NoTheme>(navigationItem, anchorStyles);

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

export interface UtilityLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Display an icon in addition to the text to help to identify the link.
   * On narrow viewports, only the icon is displayed.
   */
  icon: FC<IconProps<'24'>>;
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
}

function UtilityLink({ icon: Icon, label, ...props }: UtilityLinkProps) {
  const { Link } = useComponents();

  return (
    <UtilityAnchor
      {...props}
      as={props.href ? (Link as EmotionAsPropType) : 'button'}
    >
      <Skeleton css={iconStyles}>
        <Icon role="presentation" size="24" />
      </Skeleton>
      <Skeleton>
        <UtilityLabel
          variant={props.isActive ? 'highlight' : undefined}
          as="span"
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
