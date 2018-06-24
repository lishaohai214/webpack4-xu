目前浏览器部分支持 es6 ，目前 es7 、 es8 都出来了
那么这些最新的语法，想要浏览器进行正常的读取的话
就需要进行转换，

转换， 可以使用浏览的[babel 官网](http://babeljs.io/repl) 进行转换
当然也可以使用编译器进行转换

下载 babel-core
```s
    $ npm install babel-core 
```

在根路径下创建一个文件，这个文件非常的特殊
```s
    $ echo >.babelrc  
```
`.babelrc` 其实是一个自动加载的文件，如果了解过 linux 的话
这个 ` rc ` 其实就是自动加载的意思
这个 `.babelrc` 其实就是一个 JSON 文件
所以，我们这里就会拥有一些配置，这里就会有一些预编译的语法 
或者 我们需要的 preset 其实主要还是 对 es6 进行配置
然后直接去展示
等会在展示

现在先到 src 下的 main.js
```js
// alert('Hello World!')
require('./main.css')
require('./index.html')

let a = () => {
    console.log("Hello Future!");
}
```
```s
    $ npm install babel-plugin-transform-es2015-arrow-functions
    /*
    这个插件的作用就是 将箭头函数 转换成 es5 所读取的 function
    */
```
.babelrc  
```json
{
    "plugins": [
        "transform-es2015-arrow-functions"
    ]
}
```
能够使用 babel 这个命令
需要做的事情，是全局安装一下 babel 
```s
    $ npm install babel-cli
    $ babel src/main.js   // 将 mian.js 的文件进行转换
```

上面介绍了 babel 的转换
那么我们肯定是想要将我们的 babel 配置到webpack中，当我们打包的时候就进行转换

webpack.dev.js 配置一下 js loaders
```js
// ...
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
// .. . 省略
```
```s
    $ npm install babel-loader 
    $ npm run dev 
    $ npm run build // => 找一下 console.log 
```

以上就是 babel 的一些讲解