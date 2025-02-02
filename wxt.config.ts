import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    browser: "firefox",
    extensionApi: "chrome",
    modules: ["@wxt-dev/module-react"],
    manifest: {
        permissions: ["tabs", "alarms"],
        host_permissions: ["https://wallhaven.cc/"],
    },
});
