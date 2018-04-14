import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Selector from './Selector';

storiesOf('Selector', module)
  .addDecorator(withTests('Selector'))
  .add('Default Selector', withInfo()(() => <Selector>Select me!</Selector>))
  .add(
    'Disabled Selector',
    withInfo()(() => <Selector disabled>I cannot be selected</Selector>)
  )
  .add(
    'Selected Selected',
    withInfo()(() => <Selector selected>I am selected!</Selector>)
  );
