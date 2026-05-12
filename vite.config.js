import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:          'index.html',
        features:      'features.html',
        pricing:       'pricing.html',
        blog:          'blog.html',
        blogPost:      'blog-post.html',
        docs:          'docs.html',
        signin:        'signin.html',
        connectWallet: 'connect-wallet.html',
      },
    },
  },
})
