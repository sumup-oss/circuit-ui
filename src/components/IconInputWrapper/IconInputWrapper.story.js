import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import IconInputWrapper from '.';

storiesOf('IconInputWrapper', module)
  .addDecorator(withTests('IconInputWrapper'))
  .add('Default IconInputWrapper', withInfo()(() => <IconInputWrapper />));
