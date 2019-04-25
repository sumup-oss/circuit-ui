import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import State from '../State';
import Select from '.';

import { ReactComponent as DE } from './flags/de.svg';
import { ReactComponent as US } from './flags/us.svg';
import { ReactComponent as FR } from './flags/fr.svg';

const options = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  }
];

const countryOptions = [
  {
    label: 'United States',
    value: 'US'
  },
  {
    label: 'Germany',
    value: 'DE'
  },
  {
    label: 'France',
    value: 'FR'
  }
];
const flagIconMap = { DE, US, FR };

storiesOf(`${GROUPS.FORMS}|Select`, module)
  .addDecorator(withTests('Select'))
  .add(
    'Select',
    withInfo()(() => (
      <Select
        name="select"
        options={options}
        onChange={action('Option selected')}
        disabled={boolean('Disabled', false)}
        invalid={boolean('Invalid', false)}
      />
    ))
  )
  .add(
    'Select with prefix',
    withInfo()(() => (
      <State
        initial="US"
        name="country"
        updaterName="onChange"
        updater={(prevCountry, country) => country}
      >
        {({ country, onChange }) => (
          <Select
            name="country_select"
            options={countryOptions}
            value={country}
            renderPrefix={({ className }) => {
              const Icon = flagIconMap[country];

              return <Icon {...{ className }} />;
            }}
            onChange={e => {
              action('Option selected')(e);
              onChange(e.target.value);
            }}
            disabled={boolean('Disabled', false)}
            invalid={boolean('Invalid', false)}
          />
        )}
      </State>
    ))
  );
