import { Config } from '@jest/types'

const config: Config.InitialOptions  = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setupFilesAfterEnv.ts'],
  // globalTeardown: '<rootDir>/tests/globalTeardown.ts',
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testTimeout: 10000,
  modulePathIgnorePatterns: ["<rootDir>/build/"]

};

export default config
