import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Component from './Component';

storiesOf('Component', module)
  .addDecorator(withTests('Component'))
  .add('Default Component', withInfo()(() => <Component />));
