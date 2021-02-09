module.exports = {
  clearMocks: true,
  errorOnDeprecated: true,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['lib'],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'jsdom',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.ts', '!<rootDir>/**/*.d.ts']
}
