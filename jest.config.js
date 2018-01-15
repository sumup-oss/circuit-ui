module.exports = {
  coverageDirectory: '../../__coverage__',
  rootDir: '.',
  roots: ['src', 'util'],
  moduleFileExtensions: ['js'],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  moduleDirectories: ['node_modules', 'src', 'util'],
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
    '\\.svg$': '<rootDir>/fileTransformer.js'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/style-mock.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js'
};
