import viteReact from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
    return {
        plugins: [
            viteReact(),
            tsconfigPaths()
        ],
        server: {
            open: true,
            port: 3001
        }
    }
});
