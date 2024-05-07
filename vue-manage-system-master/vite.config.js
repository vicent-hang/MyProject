import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

export default defineConfig ({
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/trans': {
                target: 'http://119.3.179.70:8081',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/trans/, '')
            },
            '/myApi': {
                target:'http://apis.juhe.cn/',
                changeOrigin: true,
                //重写路径
                rewrite: (path) => path.replace(/^\/myApi/, '')
            },
        }
    }, 
})


