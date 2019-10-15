module.exports = {
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
    '^.+\\.svg$': '<rootDir>/jest.fileTransform.js'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },
  coverageDirectory: './__coverage__',
  coverageReporters: ['cobertura', 'text-summary', 'html'],
  collectCoverageFrom: ['components/**/*.js', 'pages/**/**/*.js']
};
