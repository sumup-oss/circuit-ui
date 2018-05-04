import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import AutoComplete from './AutoComplete';

storiesOf('Autocomplete', module)
  .addDecorator(withTests('Autocomplete'))
  .add(
    'Default Autocomplete',
    withInfo()(() => (
      <div style={{ width: '300px' }}>
        <AutoComplete
          items={[
            'liam.murphy@sumup.com',
            'liam.burdock@sumup.com',
            'lilijane.giordano@sumup.com'
          ]}
          handleChange={action('handleChange')}
        />
      </div>
    ))
  );
