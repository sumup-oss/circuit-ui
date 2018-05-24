import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import SearchInput from '.';

storiesOf(`${GROUPS.FORMS}|SearchInput`, module)
  .addDecorator(withTests('SearchInput'))
  .add('Default SearchInput', withInfo()(() => <SearchInput />))
  .add('Disabled SearchInput', withInfo()(() => <SearchInput disabled />));
