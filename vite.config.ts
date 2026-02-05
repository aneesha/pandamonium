import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Pandamonium',
      fileName: (format) => `pandamonium.${format}.js`
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['blockly'],
      output: {
        globals: {
          blockly: 'Blockly'
        }
      }
    }
  },
  server: {
    open: true
  }
});
