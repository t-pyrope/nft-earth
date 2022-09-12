import { defineConfig } from 'vite' ;
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  
  root: 'src',
  build: {
    outDir: '../dist',
  },
  
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          title: env == '' '':' [${env.toUpperCase()}]',
        },
      },
    }),
   ],
  
  
 });  
