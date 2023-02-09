const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
  coverageDirectory: './__coverage__',
  coverageReporters: ['cobertura', 'text-summary', 'html'],
  collectCoverageFrom: [
    'components/**/*.(js|jsx|ts|tsx)',
    'pages/**/*.(js|jsx|ts|tsx)',
    'services/**/*.(js|jsx|ts|tsx)',
    '!components/**/index.(js|jsx|ts|tsx)',
    '!**/*.d.ts',
    '!/public/',
    '!/node_modules/',
  ],
};

module.exports = createJestConfig(customJestConfig);
