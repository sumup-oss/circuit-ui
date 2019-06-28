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
