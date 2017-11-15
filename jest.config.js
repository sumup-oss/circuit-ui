module.exports = {
  coverageDirectory: '../../__coverage__',
  rootDir: 'src',
  moduleFileExtensions: ['js'],
  collectCoverageFrom: [ '**/**/*.{js,jsx}', '!**/node_modules/**' ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.js$': '<rootDir>/../jest.transform.js',
    '\\.svg$': '<rootDir>/../fileTransformer.js'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/style-mock.js'
  }
};
