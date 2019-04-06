module.exports = {
  transform: {
    '^.+\\.js?$': './jest-transform.js',
  },
  testPathIgnorePatterns: ['node_modules'],
  collectCoverage: true,
  collectCoverageFrom: [ "./src/**/*.js"]
};
