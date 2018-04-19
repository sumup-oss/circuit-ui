import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../../../util/withTests';
import CalendarWrap from './CalendarWrap';

storiesOf('CalendarWrap', module)
  .addDecorator(withTests('CalendarWrap'))
  .add('Default CalendarWrap', withInfo()(() => <CalendarWrap />));
