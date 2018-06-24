## 加载html & 图片
目前在 src 下并没有 html
而 dist 下面是有 html 的，
现在将这个 index.html 移动到 src 下
```s
    $ mv dist/index.html src/
    $ rm dist/main-bundle.js  // 删掉指定的文件
```

到 main.js 中引入 index.html 
```t
    // alert('Hello World!')
    require('./main.css')
    require('./index.html')
```

下载 html-loader、extract-loader、file-loader
```s
    $ npm install html-loader extract-loader file-loader
```

配置 webpack.dev.js
```js
const path = require("path");
module.exports = {
    entry: {
        main: "./src/main.js"
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
                        
                    }

                ]
            }
        ]
    }
};

```
运行一下项目

```s
    $ npm run dev
    $ npm run build

    $ rm dist/index.html
    $ rm main-bundle.js

```
##  加载图片
```s
    $ mkdir src/images 
```

往文件夹添加一张图片
index.html
```html
<body>
    <div class="profile">
        <img src="./images/picture.jpg" alt="">
        <h1>Hello 美女</h1>
    </div>
    <script src="/main-bundle.js"></script>
</body>
```

进入 webpack.dev.js html-loader
其实现在图片，就是在 html-loader 中
```js
 // .... 省略没有变化的内容
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
                test: /\.(jgp|png|gif)$/,
                use:[
                    {
                        loader: "file-loader",
                        options: {
                            // 原本的名字是啥就配置是啥，当然可以重新起名字
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};
```
给图片添加 hash 值，长度为 8 

```js
// .... 
// image loader
{
    test: /\.(jgp|png|gif)$/,
    use:[
        {
            loader: "file-loader",
            options: {
                // 原本的名字是啥就配置是啥，当然可以重新起名字
                name: "images/[name].[ext]"
                // name: "images/[name]-[hash:8].[ext]" // 暂时注释掉
            }
        }
    ]
}
```

调 一下 css 样式
main.css
```css
body{
    /* color: red; */
    background-color: #444444;
}

.profile {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}

img {
    border-radius: 100%;
    width: 300px;
    box-shadow: 0 0 20px black;
}
h1 {
    color: white;
    font-size: 5em;
    font-family: sans-serif;
    text-shadow: 0 0 20px black;
}
```




