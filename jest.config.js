module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "refine-frappe",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
      // Force CommonJS build for http adapter to be available.
      // via https://github.com/axios/axios/issues/5101#issuecomment-1276572468
      "^axios$": require.resolve("axios"),
  },
};
