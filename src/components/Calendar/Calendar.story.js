import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Calendar from '.';

storiesOf('Calendar', module)
  .addDecorator(withTests('Calendar'))
  .add('Default Calendar', withInfo()(() => <Calendar />));
