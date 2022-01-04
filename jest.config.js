module.exports = {
  clearMocks: true,
  errorOnDeprecated: true,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  coverageDirectory: 'coverage',
  setupFiles: ['./tests/setup.js'],
  modulePathIgnorePatterns: ['dist'],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'jsdom',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.ts', '!<rootDir>/**/*.d.ts'],
  transform: {
    '\\.[jt]sx?$': 'es-babel-jest'
  },
  moduleNameMapper: {
    '^@archimedes/(.*)$': '<rootDir>/packages/$1/src'
  }
}
