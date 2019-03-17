import React from 'react';
import styled, { css } from 'react-emotion';
import { styleHelpers } from '../../../../styles';

import Tab from '../Tab';

const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;
const DEFAULT_HEIGHT = '80px';

const Wrapper = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.white};
    ${styleHelpers.shadowDouble({ theme })};
    height: ${DEFAULT_HEIGHT};
    display: flex;
    overflow-x: auto;
  `
);

const navigationBaseStyles = css`
  label: tablist;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const stretchedStyles = ({ children, theme }) => css`
  & > ${Tab} {
    flex: 1 1 auto;
    padding: 0 ${theme.spacings.kilo};
    width: ${Math.floor(100 / children.length)}%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const navigationChildrenStyles = ({ stretched, ...props }) =>
  stretched && stretchedStyles(props);

const navigationResponsiveChildrenStyles = props =>
  props.children.length <= MOBILE_AUTOSTRETCH_ITEMS_MAX &&
  css`
    ${props.theme.mq.untilKilo`
      ${stretchedStyles(props)};
    `}
  `;

const Navigation = styled.div(
  navigationBaseStyles,
  navigationChildrenStyles,
  navigationResponsiveChildrenStyles
);

/**
 * TabList component that wrap Tab components
 */
const TabList = ({ className, ...props }) => (
  <Wrapper className={className}>
    <Navigation {...props} role="tablist" />
  </Wrapper>
);

TabList.defaultProps = {};

/**
 * @component
 */
export default TabList;
