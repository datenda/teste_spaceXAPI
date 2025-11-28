module.exports = {
  preset: 'ts-jest',               
  testEnvironment: 'jsdom',        
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',   
    '^@/ui/(.*)$': '<rootDir>/components/ui/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/cypress/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
};
