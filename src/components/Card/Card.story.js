/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Card, { CardHeader, CardFooter } from '.';
import Heading from '../Heading';
import Text from '../Text';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

storiesOf('Components|Card', module)
  .addParameters({ jest: ['Card'] })
  .add('Default Card', () => (
    <Card style={{ width: '500px', height: '150px', marginBottom: '15px' }} />
  ))
  .add('Card with shadows', () => (
    <Fragment>
      <Card
        shadow={Card.SINGLE}
        style={{ width: '500px', height: '150px', marginBottom: '15px' }}
      />
      <Card
        shadow={Card.DOUBLE}
        style={{ width: '500px', height: '150px', marginBottom: '15px' }}
      />
      <Card
        shadow={Card.TRIPLE}
        style={{ width: '500px', height: '150px', marginBottom: '15px' }}
      />
    </Fragment>
  ))
  .add('Card with spacings', () => (
    <Fragment>
      <Card
        spacing={Card.MEGA}
        style={{ width: '500px', height: '150px', marginBottom: '15px' }}
      >
        <div
          style={{
            backgroundColor: 'lightgray',
            width: '100%',
            height: '100%'
          }}
        />
      </Card>
      <Card
        spacing={Card.GIGA}
        style={{ width: '500px', height: '150px', marginBottom: '15px' }}
      >
        <div
          style={{
            backgroundColor: 'lightgray',
            width: '100%',
            height: '100%'
          }}
        />
      </Card>
    </Fragment>
  ))
  .add('Card with Header and body', () => (
    <Card>
      <CardHeader>
        <Heading size={Heading.KILO} noMargin>
          Card heading
        </Heading>
      </CardHeader>
      <Text margin={false}>This is some text showing in my card</Text>
    </Card>
  ))
  .add('Card with Header, body, buttons, and close icon', () => (
    <Card>
      <CardHeader onClose={action('CloseButton clicked')}>
        <Heading size={Heading.KILO} noMargin>
          Card heading
        </Heading>
      </CardHeader>
      <Text margin={false}>This is some text showing in my card</Text>
      <CardFooter>
        <ButtonGroup>
          <Button secondary>Cancel</Button>
          <Button>Confirm</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  ))
  .add('Card footer with left aligment', () => (
    <Card>
      <CardHeader onClose={action('CloseButton clicked')}>
        <Heading size={Heading.KILO} noMargin>
          Card heading
        </Heading>
      </CardHeader>
      <Text margin={false}>This is some text showing in my card</Text>
      <CardFooter align="left">
        <ButtonGroup align="left">
          <Button secondary>Cancel</Button>
          <Button>Confirm</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  ));
