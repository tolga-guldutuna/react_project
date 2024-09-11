const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        historyApiFallback: true,
        port: 3000,
        setupMiddlewares: (middlewares, devServer) => {
            // Eski onBeforeSetupMiddleware işlevi
            devServer.app.use((req, res, next) => {
                console.log(`Request URL: ${req.url}`);
                // Burada isteklere özel işlemler yapabilirsiniz
                next(); // Bir sonraki middleware'e geç
            });

            // Eski onAfterSetupMiddleware işlevi
            devServer.app.use((req, res, next) => {
                console.log('onAfterSetupMiddleware kodu çalıştı.');
                // İstek sonrasında özel işlemler
                next(); // Bir sonraki middleware'e geç
            });

            return middlewares;
        },
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
    ],
};
