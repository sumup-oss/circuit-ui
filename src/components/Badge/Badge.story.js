import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select } from '@storybook/addon-knobs/react';
import { values } from 'lodash/fp';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import { colorNames } from '../../styles/constants';

import withTests from '../../util/withTests';
import Badge from './Badge';

storiesOf(`${GROUPS.COMPONENTS}|Badge`, module)
  .addDecorator(withTests('Badge'))
  .add(
    'Default Badge',
    withInfo()(() => (
      <Badge color={select('Color', values(colorNames))}>Update</Badge>
    ))
  )
  .add(
    'Circular Badge',
    withInfo()(() => (
      <Fragment>
        <Badge circle>1</Badge>
        <Badge circle>12</Badge>
        <Badge circle>88</Badge>
      </Fragment>
    ))
  );
