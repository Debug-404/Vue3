import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {},
    server: {
        host: "0.0.0.0",
        port: 48888,
        open: true,
    },
    plugins: [vue()],
    base: "./",
});
