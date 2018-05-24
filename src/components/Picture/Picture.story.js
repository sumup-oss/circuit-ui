import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Picture from './Picture';

storiesOf(`${GROUPS.COMPONENTS}|Picture`, module)
  .addDecorator(withTests('ResponsiveImage'))
  .add('Default Picture', withInfo()(() => <Picture />));
