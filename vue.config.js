const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.pcss']
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'loadsh'
            })
        ]
    }
}