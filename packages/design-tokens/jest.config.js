module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  rootDir: 'src',
  coverageDirectory: './__reports__',
  coveragePathIgnorePatterns: ['node_modules'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
};
