import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
  
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // Add this line
  }
)],
server: {
  proxy: {
    '/api': {
      target: `http://localhost:3000`,
      changeOrigin: true,
      secure: false
    },
  },
},
  build: {
    outDir: '../dist/app'
  },
});
