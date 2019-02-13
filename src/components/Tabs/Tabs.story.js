import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// import { action } from '@storybook/addon-actions';
// import * as knobs from '@storybook/addon-knobs/react';

import withTests from '../../util/withTests';
import Tabs from './Tabs';

storiesOf('Tabs', module)
  .addDecorator(withTests('Tabs'))
  .add('Tabs', withInfo()(() => <Tabs />));
