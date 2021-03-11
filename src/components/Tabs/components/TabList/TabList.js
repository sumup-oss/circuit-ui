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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import { shadowDouble, hideScrollbar } from '../../../../styles/style-mixins';

const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;
const DEFAULT_HEIGHT = '80px';

const Wrapper = styled.div(
  ({ theme }) => css`
    ${shadowDouble({ theme })};
    ${hideScrollbar()}
    background: ${theme.colors.white};
    height: ${DEFAULT_HEIGHT};
    display: flex;
    overflow-x: auto;
  `,
);

const navigationBaseStyles = css`
  label: tablist;
  display: flex;
  flex-wrap: nowrap;
`;

const stretchedStyles = ({ children, theme }) => css`
  width: 100%;

  & [role='tab'] {
    flex: 1 1 auto;
    padding: 0 ${theme.spacings.kilo};
    width: ${Math.floor(100 / children.length)}%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const navigationChildrenStyles = ({ stretched, ...props }) =>
  stretched && stretchedStyles(props);

const navigationResponsiveChildrenStyles = (props) =>
  props.children.length <= MOBILE_AUTOSTRETCH_ITEMS_MAX &&
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
const TabList = ({ className, style, ...props }) => (
  <Wrapper className={className} style={style}>
    <Navigation {...props} role="tablist" />
  </Wrapper>
);

TabList.propTypes = {
  /**
   * Override styles for the TabList component.
   */
  className: PropTypes.string,
};

/**
 * @component
 */
export default TabList;
