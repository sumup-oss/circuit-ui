import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Row from './Row';

storiesOf('Row', module)
  .addDecorator(withTests('Row'))
  .add('Default Row', withInfo()(() => <Row />));
