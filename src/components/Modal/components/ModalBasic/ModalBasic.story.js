import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../../../util/withTests';
import ModalBasic from './ModalBasic';

storiesOf('Modal', module)
  .addDecorator(withTests('ModalBasic'))
  .add(
    'Default ModalBasic',
    withInfo()(() => (
      <div style={{ width: '70vw', minWidth: '300px' }}>
        <ModalBasic title="Modal Default" onClose={action('inModal Close')}>
          Default modal text
        </ModalBasic>
      </div>
    ))
  );
