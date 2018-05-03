import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import CenterContainer from './CenterContainer';

storiesOf('CenterContainer', module)
  .addDecorator(withTests('CenterContainer'))
  .add('Default CenterContainer', withInfo()(() => <CenterContainer />));
