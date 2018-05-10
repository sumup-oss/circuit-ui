import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import AutoCompleteTags from './AutoCompleteTags';

const randomItems = [];
const mails = ['@sumup.com', '@gmail.com', '@hotmail.com'];
const names = ['liam', 'josh', 'tom', 'adam', 'aaron', 'john', 'killjoy'];
const pushRandom = () => {
  const name =
    names[Math.floor(Math.random() * names.length)] +
    Math.floor(Math.random() * 20000) +
    mails[Math.floor(mails.length * Math.random())];

  if (randomItems.includes(name)) {
    pushRandom();
  } else {
    randomItems.push(name);
  }
};
for (let i = 0; i < 10000; i += 1) {
  pushRandom();
}

storiesOf('AutoCompleteTags', module)
  .addDecorator(withTests('AutoCompleteTags'))
  .add(
    'Default AutoCompleteTags',
    withInfo()(() => (
      <div style={{ width: '300px' }}>
        <AutoCompleteTags
          availableTags={randomItems}
          handleChange={action('handleChange')}
        />
      </div>
    ))
  );
