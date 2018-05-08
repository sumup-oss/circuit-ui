import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

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
  .add(
    'Default Tag',
    withInfo()(() => (
      <Tag
        selected={boolean('Selected', false)}
        onRemove={boolean('Removable', false) ? action('Tag removed') : null}
        icon={boolean('With Icon', false) ? <Icon /> : null}
        onClick={boolean('Clickable', false) ? action('Tag clicked') : null}
      >
        Transactions
      </Tag>
    ))
  );
