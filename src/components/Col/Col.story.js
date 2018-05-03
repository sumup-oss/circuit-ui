import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Col from './Col';

storiesOf('Col', module)
  .addDecorator(withTests('Col'))
  .add('Default Col', withInfo()(() => <Col span="1" />));
