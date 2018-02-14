import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Label from '.';

storiesOf('Label', module)
  .addDecorator(withTests('Label'))
  .add('Default Label', withInfo()(() => <Label>An input label</Label>));
