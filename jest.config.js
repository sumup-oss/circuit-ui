module.exports = {
  coverageDirectory: '../../__coverage__',
  rootDir: '.',
  roots: ['src'],
  moduleFileExtensions: ['js'],
  collectCoverageFrom: [
    'src/@(components|util|styles)/**/[!index]*.{js,jsx}',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
    '\\.svg$': '<rootDir>/fileTransformer.js'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/style-mock.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js'
};
