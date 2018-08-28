module.exports = {
  testURL: 'http://localhost',
  coverageDirectory: './__coverage__',
  rootDir: '.',
  roots: ['src'],
  moduleFileExtensions: ['js'],
  collectCoverageFrom: [
    'src/@(components|util|styles)/**/*.{js,jsx}',
    '!src/@(components|util|styles)/**/index.{js,jsx}',
    '!src/@(components|util|styles)/**/*.story.{js,jsx}',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/jest.fileTransformer.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js'
};
