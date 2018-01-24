import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import FormLabel from './FormLabel';

storiesOf('FormLabel', module)
  .addDecorator(withTests('FormLabel'))
  .add(
    'Default FormLabel',
    withInfo()(() => <FormLabel>An input label</FormLabel>)
  );
