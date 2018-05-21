import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import InfoIcon from './InfoIcon';

storiesOf(`${GROUPS.ICONS}|InfoIcon`, module)
  .addDecorator(withTests('InfoIcon'))
  .add('Default InfoIcon', withInfo()(() => <InfoIcon />));
