import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import MaskedInput from './MaskedInput';

storiesOf(`${GROUPS.FORMS}|MaskedInput`, module)
  .addDecorator(withTests('MaskedInput'))
  .add('Default MaskedInput', withInfo()(() => <MaskedInput />));
