import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import SvgButton from './SvgButton';

storiesOf(`${GROUPS.COMPONENTS}|SvgButton`, module)
  .addDecorator(withTests('SvgButton'))
  .add('Default SvgButton', withInfo()(() => <SvgButton />));
