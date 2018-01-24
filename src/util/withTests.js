import { withTests } from '@storybook/addon-jest';

// eslint-disable-next-line import/no-unresolved
import results from '../../jest-test-results.json';

export default withTests(
  {
    results
  },
  '((\\/specs?)|(\\.specs?)|(\\.tests?))?(\\.js)?$'
);
