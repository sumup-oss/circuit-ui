import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text } from '..';

storiesOf('Typography', module)
  .add('Text', () => {
    const SIZES = [
      'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'
    ];
    return (
      <div>
        {SIZES.map(size => (<Text key={size} size={size}>{size}</Text>))}
      </div>
    );
  });
