import React from 'react';

import { flow, toPairs, reduce } from '../../../../util/fp';
import iconComponents from './card-scheme-map';

const accessibleIconComponents = flow(
  toPairs,
  reduce(
    (acc, [name, IconComponent]) => ({
      ...acc,
      [name]: props => (
        <IconComponent aria-label={`icon ${name}`} role="img" {...props} />
      )
    }),
    {}
  )
)(iconComponents);

export default accessibleIconComponents;
