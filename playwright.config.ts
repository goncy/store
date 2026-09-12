import {defineConfig, devices} from "@playwright/test";

const testEnv = {
  USE_MOCKS: "true",
  SECRET: "local-test-secret",
};

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {baseURL: "http://127.0.0.1:4318", trace: "retain-on-failure"},
  projects: [
    {name: "desktop", testMatch: "store.test.ts", use: {...devices["Desktop Chrome"]}},
    {name: "mobile", testMatch: "store.test.ts", use: {...devices["Pixel 7"]}},
    {
      name: "instant-desktop",
      testMatch: "instant.test.ts",
      use: {...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:4320"},
    },
    {
      name: "instant-mobile",
      testMatch: "instant.test.ts",
      use: {...devices["Pixel 7"], baseURL: "http://127.0.0.1:4320"},
    },
  ],
  webServer: [
    {
      command: "pnpm build && pnpm start --port 4318",
      url: "http://127.0.0.1:4318",
      timeout: 180_000,
      reuseExistingServer: false,
      env: testEnv,
    },
    {
      command: "pnpm dev --hostname 127.0.0.1 --port 4320",
      url: "http://127.0.0.1:4320",
      timeout: 180_000,
      reuseExistingServer: false,
      env: testEnv,
    },
  ],
});
