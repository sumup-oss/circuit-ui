import { withTests } from '@storybook/addon-jest';

import results from '../../__reports__/jest-results.json';

export default withTests(
  {
    results
  },
  '((\\/specs?)|(\\.specs?)|(\\.tests?))?(\\.js)?$'
);
