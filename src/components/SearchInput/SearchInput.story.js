import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import SearchInput from '.';

storiesOf('SearchInput', module)
  .addDecorator(withTests('SearchInput'))
  .add('Default SearchInput', withInfo()(() => <SearchInput />))
  .add('Disabled SearchInput', withInfo()(() => <SearchInput disabled />));
