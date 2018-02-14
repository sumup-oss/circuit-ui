import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import Tag from './Tag';

const Icon = () => (
  <svg
    fill="#000000"
    height="16"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);

storiesOf('Tag', module)
  .addDecorator(withTests('Tag'))
  .add('Default Tag', withInfo()(() => <Tag>Transactions</Tag>))
  .add(
    'Removable Tag',
    withInfo()(() => <Tag onRemove={action('Tag removed')}>Transactions</Tag>)
  )
  .add('Iconed Tag', withInfo()(() => <Tag icon={<Icon />}>Transactions</Tag>))
  .add(
    'Iconed Selected Tag',
    withInfo()(() => (
      <Tag selected icon={<Icon />}>
        Transactions
      </Tag>
    ))
  )
  .add(
    'Selected Tag',
    withInfo()(() => (
      <Tag selected onRemove={action('Tag removed')} icon={<Icon />}>
        Transactions
      </Tag>
    ))
  )
  .add(
    'Clickable Tag',
    withInfo()(() => <Tag onClick={action('Tag clicked')}>Transactions</Tag>)
  );
