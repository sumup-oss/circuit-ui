import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Input, { InputTooltip } from '.';
import Label from '../Label';

storiesOf('Input', module)
  .addDecorator(withTests('Input'))
  .add('Input', withInfo()(() => <Input placeholder="Placeholder" />))
  .add(
    'Input invalid',
    withInfo()(() => (
      <Fragment>
        <Input placeholder="Placeholder" invalid>
          <InputTooltip visible>This field is required.</InputTooltip>
        </Input>
        <Input placeholder="Placeholder" invalid />
      </Fragment>
    ))
  )
  .add(
    'Input warning',
    withInfo()(() => (
      <Fragment>
        <Input placeholder="Placeholder" hasWarning>
          <InputTooltip visible>This does not look right.</InputTooltip>
        </Input>
        <Input placeholder="Placeholder" hasWarning />
      </Fragment>
    ))
  )
  .add(
    'Input optional',
    withInfo()(() => <Input placeholder="Placeholder" optional />)
  )
  .add(
    'Input disabled',
    withInfo()(() => <Input value="Some value" disabled />)
  )
  .add(
    'Input right aligned text',
    withInfo()(() => <Input placeholder="Placeholder" textAlign="right" />)
  )
  .add(
    'Inline inputs',
    withInfo()(() => (
      <div>
        <Input placeholder="First" inline />
        <Input placeholder="Second" inline />
      </div>
    ))
  )
  .add(
    'Stacked inputs',
    withInfo()(() => (
      <div>
        <Label htmlFor="first">My label</Label>
        <Input placeholder="First" id="first" />
        <Label htmlFor="second">My second label</Label>
        <Input placeholder="Second" id="second" />
      </div>
    ))
  );
