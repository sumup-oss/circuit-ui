import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import CloseButton from './CloseButton';

storiesOf(`${GROUPS.COMPONENTS}|CloseButton`, module)
  .addDecorator(withTests('CloseButton'))
  .add('Default CloseButton', withInfo()(() => <CloseButton />));
