/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  setupFilesAfterEnv: [],
  collectCoverageFrom: [
    'build/**/*.ts',
    'scripts/**/*.ts',
    '!build/**/*.spec.ts',
    '!build/**/*.test.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'html'
  ],
  testTimeout: 60000,
  verbose: true,
  maxWorkers: 1,
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],
  collectCoverage: true,
  bail: false,
  detectOpenHandles: true,
  forceExit: true
}; 