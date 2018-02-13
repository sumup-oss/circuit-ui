import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import { KILO } from '../../util/sizes';
import Card, { CardHeader, CardFooter } from '.';
import Heading from '../Heading';
import Text from '../Text';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

storiesOf('Card', module)
  .addDecorator(withTests('Card'))
  .add(
    'Card',
    withInfo()(() => (
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
  )
  .add(
    'Card with Header and body',
    withInfo()(() => (
      <Card>
        <CardHeader>
          <Heading size={KILO} margin={false}>
            Card heading
          </Heading>
        </CardHeader>
        <Text margin={false}>This is some text showing in my card</Text>
      </Card>
    ))
  )
  .add(
    'Card with Header, body, buttons, and close icon',
    withInfo()(() => (
      <Card>
        <CardHeader onClose={action('CloseButton clicked')}>
          <Heading size={KILO} margin={false}>
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
  );
