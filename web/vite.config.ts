import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({
        pages: 'dist',
        assets: 'dist',
        fallback: '404.html',
        precompress: false,
        strict: true
      })
    })
  ]
});
