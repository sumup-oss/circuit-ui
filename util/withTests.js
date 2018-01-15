import { withTests } from '@storybook/addon-jest';

import results from '../jest-test-results.json';

export default withTests(
  {
    results
  },
  '((\\/specs?)|(\\.specs?)|(\\.tests?))?(\\.js)?$'
);
