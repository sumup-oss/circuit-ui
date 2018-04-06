import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import InfoIcon from './InfoIcon';

storiesOf('InfoIcon', module)
  .addDecorator(withTests('InfoIcon'))
  .add('Default InfoIcon', withInfo()(() => <InfoIcon />));
