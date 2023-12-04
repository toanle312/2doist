import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/todoist/",
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    }
  }
})
