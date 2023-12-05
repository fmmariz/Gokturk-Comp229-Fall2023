import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 3000 } = process.env;
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // Add this line
  }
)],
server: {
  proxy: {
    '/api': {
      target: `http://localhost:${PORT}`,
      changeOrigin: true,
      secure: false
    },
  },
},
  build: {
    outDir: '../../dist/app'
  },
});
