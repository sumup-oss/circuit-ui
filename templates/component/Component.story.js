import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from './util/withTests';
import { Component } from '../src/components/Component';

storiesOf('Component', module)
  .addDecorator(withTests('Button'))
  .add('Default Component', withInfo()(() => <Component />));
