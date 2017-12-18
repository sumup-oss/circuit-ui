import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Text, Headline } from '..';

const style = { display: 'flex', width: '80%', margin: '0 auto' };
const cardStyle = { width: '50%', margin: '6px' };

storiesOf('Cards', module).add('Card', () => (
  <Card>
    <h1>This is a card</h1>
    <div style={style}>
      <Card variant="inlay" style={cardStyle}>
        <p>This is the "inlay" card variant.</p>
      </Card>
      <Card variant="overlay" style={cardStyle}>
        <p>This is the "overlay" card variant.</p>
      </Card>
    </div>
  </Card>
));
