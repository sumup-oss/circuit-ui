import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import SearchInput from './SearchInput';

storiesOf('SearchInput', module)
  .addDecorator(withTests('SearchInput'))
  .add(
    'Default SearchInput',
    withInfo()(() => (
      <SearchInput
        onFocus={action('SearchInput entered focused')}
        onBlur={action('SearchInput blurred')}
      />
    ))
  );
