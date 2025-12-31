/* eslint-env node */
const nextJest = require('next/jest');

const createJestConfig = nextJest({dir: './'});

module.exports = async () => ({
  ...(await createJestConfig({
    testEnvironment: 'jsdom',
    rootDir: 'src',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1'
    }
  })()),
  transformIgnorePatterns: ['node_modules/(?!next-intl)/']
});
