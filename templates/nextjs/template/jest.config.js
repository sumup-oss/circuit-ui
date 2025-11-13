/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import nextJest from 'next/jest.js';

const esModules = [
  '@sumup-oss/circuit-ui',
  '@sumup-oss/icons',
  '@sumup-oss/intl',
  '@nanostores/react',
  'nanostores',
].join('|');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    // Jest doesn't yet support full absolute import paths in TypeScript projects
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`/node_modules/(?!${esModules}/)`],
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

// next/jest has a `transformIgnorePatterns` on the whole `node_modules`.
// Some of the packages needs to be transformed as they are ES6 modules.
// See https://github.com/vercel/next.js/issues/35634
export default async () => {
  const config = await createJestConfig(customJestConfig)();
  // `/node_modules/` is the first pattern
  config.transformIgnorePatterns[0] = `/node_modules/(?!${esModules}/)`;
  return config;
};
