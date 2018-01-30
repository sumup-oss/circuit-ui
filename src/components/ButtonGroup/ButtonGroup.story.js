import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import ButtonGroup from './ButtonGroup';

storiesOf('ButtonGroup', module)
  .addDecorator(withTests('ButtonGroup'))
  .add('Default ButtonGroup', withInfo()(() => <ButtonGroup />));
