import path from 'path'

export default {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
            '@assets': path.join(__dirname, './src/assets'),
            '@layout': path.join(__dirname, './src/layout'),
            '@styles': path.join(__dirname, './src/styles'),
            '@apis': path.join(__dirname, './src/apis'),
            '@components': path.join(__dirname, './src/components'),
            '@constants': path.join(__dirname, './src/constants'),
            '@hooks': path.join(__dirname, './src/hooks'),
            '@models': path.join(__dirname, './src/models'),
            '@routers': path.join(__dirname, './src/routers'),
            '@stores': path.join(__dirname, './src/stores'),
            '@utils': path.join(__dirname, './src/utils'),
            '@views': path.join(__dirname, './src/views'),
        },
    }
}