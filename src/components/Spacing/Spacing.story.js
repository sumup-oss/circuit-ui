import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Spacing from './Spacing';
import Button from '../Button';

storiesOf('Spacing', module)
  .addDecorator(withTests('Spacing'))
  .add(
    'Bottom Spacing',
    withInfo()(() => (
      <Fragment>
        <Spacing bottom>
          <Button primary>Spacing bottom</Button>
        </Spacing>
        <Button>No spacing</Button>
      </Fragment>
    ))
  )
  .add(
    'Top Spacing',
    withInfo()(() => (
      <Fragment>
        <Button>No spacing</Button>
        <Spacing top>
          <Button primary>Spacing top</Button>
        </Spacing>
      </Fragment>
    ))
  );
