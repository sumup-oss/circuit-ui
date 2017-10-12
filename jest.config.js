module.exports = {
  coverageDirectory: '../../__coverage__',
  rootDir: 'src',
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [
    "/node_modules/(?!test-component).+\\.js$"
  ],
  collectCoverageFrom: [
    'src/*.{js,jsx}',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.js$': '<rootDir>/../jest.transform.js'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/style-mock.js'
  }
};
