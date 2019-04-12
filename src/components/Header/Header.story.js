import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import Header from '.';
import Hamburguer from '../Hamburger';

const HeaderContainer = styled('div')`
  width: 375px;
  height: auto;
`;

storiesOf(`${GROUPS.COMPONENTS}|Header`, module)
  .addDecorator(withTests('Header'))
  .add(
    'Header',
    withInfo()(() => (
      <HeaderContainer>
        <Header title="Title">
          <Hamburguer light />
        </Header>
      </HeaderContainer>
    ))
  );
