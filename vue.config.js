module.exports = {
    publicPath: '/admin',
    outputDir: 'dist',
    assetsDir: 'assts',
    productionSourceMap: false,
    devServer: {
        port: 80,
        host: '0.0.0.0',
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: process.env.PROXY_HOST,
                // target:'http://192.168.0.132:8777',
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    }
};
