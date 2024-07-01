import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }],
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@panva/hkdf|jose|next-auth)/)',
    'node_modules/(?!(next-auth|uuid)/)',
  ],
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js",
    // mock next/image
    '^next/image$': '<rootDir>/src/__mocks__/nextImageMock.tsx',
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  
};

export default config;
