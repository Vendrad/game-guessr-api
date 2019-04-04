module.exports = {
  transform: {
    '^.+\\.js?$': './jest-transform.js',
  },
  testPathIgnorePatterns: ['node_modules'],
  setupFiles: [
    './jest-setup-tests.js',
  ],
  collectCoverage: true,
};
