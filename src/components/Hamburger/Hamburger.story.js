import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import State from '../State';

import Hamburger from './Hamburger';

storiesOf(`${GROUPS.COMPONENTS}|Hamburger`, module).add(
  'Hamburger',
  withInfo()(() => {
    const light = boolean('light', false);
    return (
      <State
        initial={false}
        name="isActive"
        updaterName="onClick"
        updater={isActive => !isActive}
      >
        {({ onClick, isActive }) => (
          <Hamburger
            isActive={isActive}
            onClick={e => {
              action('Hamburger clicked')(e);
              onClick(e);
            }}
            labelActive={text('Label active', 'Close menu')}
            labelInActive={text('Label inactive', 'Open menu')}
            light={light}
          />
        )}
      </State>
    );
  })
);
