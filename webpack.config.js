const path = require("path");

module.exports = {
    entry: "./main.ts",
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "./dist"),
        publicPath: "public/dist/"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.js@/,
                exclude: ["/node_modules"]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.wgsl$/,
                use: ["ts-shader-loader"]
            }
        ]
    }
};