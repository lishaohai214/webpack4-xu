const path = require("path");
module.exports = {
    entry: {
        // main: ["babel-polyfill", "./src/main.js"]
        // main: ["core-js/fn/promise", "./src/main.js"]
        main: ["core-js/fn/promise", "./src/main.js"]
    },
    mode: "",
    output: {
        filename: "[name]-bundle.js", // main-bundle.js
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    // 本地服务器
    devServer:{
        contentBase: "dist", // 服务器默认进入 dist 文件夹下
        overlay: true,
    },
    module: {
        rules: [
            // js loaders
            {
                test: /\.js$/,
                use: [
                    {
                        loader:"babel-loader"
                    },
                ],
                exclude: /node_module/
            },
            // css loaders
            { 
                test: /\.css$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ]
            },
            //html loaders
            {
                test:/\.html$/,
                use: [
                    {
                        // 可以给当前所加载的文件起名，目前我们的.html文件叫index.html。那么起名也会是 index.html
                        loader: "file-loader",
                        options: {
                            name: "[name].html"
                        }
                    },
                    {
                        /* 
                            作用是将 index.html 跟我们的 bundle.js 进行区分
                            因为我们以前加载一些css, js 我们都会把它融入到 main.bundle.js中去，如果你使用了 extract-loader 的话， 它就会将你的 html 文件和 bundle.js 进行分割，而不会把 html 和 bundle.js 放到一起。
                        */
                        loader: "extract-loader"
                    },
                    {
                        /*
                            这几个 loader 的加载其实是具有对应的流程的，如果你有一个 html 的loader，
                            它就会帮你找到对应的 html文件
                            然后 会借助于你的 extract-loader 跟你的 bundle.js 进行分离
                            然后 第三个 file-loader 会将你当前的 html 文件进行起名
                        */ 
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    },
                ]
            },
            // image loader
            {
                test: /\.(jpg|png|gif)$/,
                use:[
                    {
                        loader: "file-loader",
                        options: {
                            // 原本的名字是啥就配置是啥，当然可以重新起名字
                            name: "images/[name]-[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};