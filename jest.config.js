module.exports = {
  preset: "ts-jest",                   // Use ts-jest for running TypeScript files
  testEnvironment: "node",             // Set the environment to Node.js
  testMatch: ["**/tests/**/*.test.ts"], // Specify test file patterns
  moduleFileExtensions: ["ts", "js"],  // Recognize .ts and .js files
  collectCoverage: true,               // Enable test coverage reporting
  coverageDirectory: "coverage",       // Output folder for coverage reports
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  verbose: true                        // Show detailed test results
};
