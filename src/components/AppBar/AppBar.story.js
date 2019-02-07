import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import AppBar from '.';

const AppBarContainer = styled('div')`
  width: 375px;
  height: auto;
`;

storiesOf(`${GROUPS.COMPONENTS}|AppBar`, module)
  .addDecorator(withTests('AppBar'))
  .add(
    'AppBar',
    withInfo()(() => (
      <AppBarContainer>
        <AppBar title="Title" />
      </AppBarContainer>
    ))
  );
