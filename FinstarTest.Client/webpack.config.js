const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: "./index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        open: true,
        port: 5000,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'build'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
        }),
    ],
};
