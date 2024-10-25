// jest.config.js
module.exports = {
  roots: ['<rootDir>/src'], // Your source code root
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)', // Match files ending with .test.js, .spec.js, etc.
    '**/tests/**/*.[jt]s?(x)', // Match any test files within the tests directory
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/index.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
};
