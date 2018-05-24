import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Label from '.';

storiesOf(`${GROUPS.FORMS}|Label`, module)
  .addDecorator(withTests('Label'))
  .add('Default Label', withInfo()(() => <Label>An input label</Label>));
