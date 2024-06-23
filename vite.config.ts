/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        // hmr: {
        //     clientPort: 3000,
        // },
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
    preview: {
        port: 5174,
    },
});
