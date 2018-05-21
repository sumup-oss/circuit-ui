import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import RestrictedInput from './RestrictedInput';

storiesOf(`${GROUPS.FORMS}|RestrictedInput`, module)
  .addDecorator(withTests('RestrictedInput'))
  .add('Default RestrictedInput', withInfo()(() => <RestrictedInput />));
