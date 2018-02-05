import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Image from './Image';

storiesOf('Image', module)
  .addDecorator(withTests('Image'))
  .add(
    'Responsive Image',
    withInfo()(() => (
      <Image
        src="http://www.placepuppy.net/800/500"
        alt="A random cute puppy"
      />
    ))
  );
