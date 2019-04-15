module.exports = {
  transform: {
    '^.+\\.js?$': './jest-transform.js',
  },
  testPathIgnorePatterns: ['node_modules'],
  collectCoverageFrom: ['./src/**/*.js'],
};
