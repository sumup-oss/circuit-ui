import React from 'react';
import styled from '@emotion/styled';
import { withProps } from 'recompose';
import List from '../List';
import ListItem from '../ListItem';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import { styleHelpers } from '../../../../styles';

const Menu = styled(
  withProps({
    gutter: List.BYTE
  })(List)
)`
  background-color: white;
  min-width: 220px;
  ${styleHelpers.shadowSingle};
`;

Menu.Item = styled(({ icon, children, ...rest }) => (
  <ListItem {...rest} component="a">
    {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText>{children}</ListItemText>
  </ListItem>
))`
  color: #323e4d;
  &:hover {
    background-color: ${({ theme }) => theme.colors.n300};
  }
`;

export default Menu;
