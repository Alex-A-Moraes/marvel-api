module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    clearMocks: true,
    preset: 'ts-jest',
    projects: ['<rootDir>/jest.config.js'],
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
