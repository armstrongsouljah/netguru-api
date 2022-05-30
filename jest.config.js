const esModules = ['uuid'].join('|');
module.exports = {
    preset: "@shelf/jest-mongodb",
    verbose: true,
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ],
    transform: {},
}