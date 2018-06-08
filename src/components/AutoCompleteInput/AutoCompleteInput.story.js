import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import AutoCompleteInput from './AutoCompleteInput';

storiesOf(`${GROUPS.FORMS}|AutoCompleteInput`, module)
  .addDecorator(withTests('AutoCompleteInput'))
  .add(
    'Default AutoCompleteInput',
    withInfo()(() => (
      <div style={{ width: '300px' }}>
        <AutoCompleteInput
          items={[
            'liam.murphy@sumup.com',
            'liam.burdock@sumup.com',
            'lilijane.giordano@sumup.com'
          ]}
          onChange={action('handleChange')}
          clearOnSelect={boolean('clearOnSelect', false)}
        />
      </div>
    ))
  );
