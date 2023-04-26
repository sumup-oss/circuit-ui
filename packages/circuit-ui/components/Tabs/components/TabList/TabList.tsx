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

import { Children, HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import { shadow, hideScrollbar } from '../../../../styles/style-mixins';
import styled, { StyleProps } from '../../../../styles/styled';

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  stretched?: boolean;
}

const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;
const DEFAULT_HEIGHT = '48px';

const Wrapper = styled.div`
  ${shadow()};
  ${hideScrollbar()}
  background: var(--cui-bg-normal);
  height: ${DEFAULT_HEIGHT};
  display: flex;
  overflow-x: auto;
`;

const navigationBaseStyles = css`
  display: flex;
  flex-wrap: nowrap;
`;

const stretchedStyles = ({ children, theme }: StyleProps & TabListProps) => css`
  width: 100%;

  & [role='tab'] {
    flex: 1 1 auto;
    padding: 0 ${theme.spacings.kilo};
    width: ${Math.floor(100 / Children.toArray(children).length)}%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const navigationChildrenStyles = ({
  stretched,
  ...props
}: StyleProps & TabListProps) => stretched && stretchedStyles(props);

const navigationResponsiveChildrenStyles = (props: StyleProps & TabListProps) =>
  Children.toArray(props.children).length <= MOBILE_AUTOSTRETCH_ITEMS_MAX &&
  css`
    ${props.theme.mq.untilKilo} {
      ${stretchedStyles(props)};
    }
  `;

const Navigation = styled.div(
  navigationBaseStyles,
  navigationChildrenStyles,
  navigationResponsiveChildrenStyles,
);

/**
 * TabList component that wraps the Tab components
 */
export function TabList({ className, style, ...props }: TabListProps) {
  return (
    <Wrapper className={className} style={style}>
      <Navigation {...props} role="tablist" />
    </Wrapper>
  );
}
