import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

// import withTests from '../../util/withTests';
import AutoCompleteTags from './AutoCompleteTags';

storiesOf('AutoCompleteTags', module)
  // .addDecorator(withTests('AutoCompleteTags'))
  .add(
    'Default AutoCompleteTags',
    withInfo()(() => (
      <div style={{ width: '300px' }}>
        <AutoCompleteTags
          availableTags={[
            'liam.murphy@sumup.com',
            'liam.burdock@sumup.com',
            'lilijane.giordano@sumup.com'
          ]}
          handleChange={action('handleChange')}
        />
      </div>
    ))
  );
