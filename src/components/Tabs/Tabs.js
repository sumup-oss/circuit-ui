import React from 'react';
import styled, { css } from 'react-emotion';
import { styleHelpers } from '../../styles';

import Tab from './components/Tab';

const DEFAULT_HEIGHT = '80px';
const MOBILE_AUTOSTRETCH_ITEMS_LIMIT = 4;

const Wrapper = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.white};
    ${styleHelpers.shadowDouble({ theme })};
    height: ${DEFAULT_HEIGHT};
    display: flex;
    overflow-x: auto;
  `
);

const containerBaseStyles = css`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const stretchedStyles = ({ children, theme }) => css`
  & ${Tab} {
    flex: 1 1 auto;
    padding: 0 ${theme.spacings.kilo};
    width: ${Math.floor(100 / children.length)}%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const containerChildrenStyles = ({ stretched, ...props }) =>
  stretched && stretchedStyles(props);

const containerResponsiveChildrenStyles = props =>
  props.children.length < MOBILE_AUTOSTRETCH_ITEMS_LIMIT &&
  css`
    ${props.theme.mq.untilKilo`
      ${stretchedStyles(props)};
    `}
  `;

const Container = styled.div(
  containerBaseStyles,
  containerChildrenStyles,
  containerResponsiveChildrenStyles
);

/**
 * Tabs component that wraps list of tabs
 */
const Tabs = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Container {...props} role="tablist">
      {children}
    </Container>
  </Wrapper>
);

/**
 * @component
 */
export default Tabs;
