
## 加载css
```s
    $ echo >src/main.css 回车
```
进入main.css
```css
body {
    color: red;
}

``` 
进入main.js 引入 css 文件
```js
    // alert('Hello World!')
    require('./main.css')
```
```s
    $ webpack-dev-server --config=config/webpack.dev.js --mode=development
```

报错
```s
    ERROR in ./src/main.css
    Module parse failed: Unexpected token (1:4)
    You may need an appropriate loader to handle this file type.
    | body{
    |     color: red;
    | }
    @ ./src/main.js 2:0-21
    @ multi (webpack)-dev-server/client?http://localhost:8080 ./src/main.js
```

错误的原因是，没有对应的 css loader，因为 webpack 只识别 js，所以需要对应的 loader 才能加载css文件。
下载对应的 css-loader、 style-loader
```s
    $  npm install css-loader style-loader 
```
配置 loader， 需要到 webpack.dev.js 中配置
webpack4 跟 webpack2、webpack1 是不一样的。
详细如下：
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
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ]
            }
        ]
    }
};
```

只要修改了配置文件就得重新启动 服务器

```s
    $ npm run dev // webpack-dev-server --config=config/webpack.dev.js --mode=development 
```
![pic_local](...)
修改一下样式

```css
body{
    /* color: red; */
    background-color: #444444;
}

h1 {
    height: 100vh;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 5em;
    font-family: sans-serif;
    text-shadow: 0 0 20px black;
}
```
少些一个css 的 “ ; ” 试试，控制台会报错
```css
body{
    /* color: red; */
    background-color: #444444;
}

h1 {
    height: 100vh;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center          /* --> 这里少写了一个分号*/
    font-size: 5em;
    font-family: sans-serif;
    text-shadow: 0 0 20px black;
}

```
![pic_error_css](...)

平时用脚手架的时候，报错，不仅仅是控制台报错，浏览器也会报错。
需要对webpack.dev.js 下面的 devServer进行配置
```js
    // ...
    // 本地服务器
    devServer:{
        contentBase: "dist", // 服务器默认进入 dist 文件夹下
        overlay: true,
    },
```
重新启动服务器
```s
    $ webpack-dev-server --config=config/webpack.dev.js --mode=development 
```
效果如下
![error_css_overlay](....)

这样子就可以很明了的 错误在哪里。
现在改回来，把“ ; ” 加上

每一次启动到 写入一长串的 webpack-dev-server --config=config/ ...
很麻烦 
现在到package.json中配置的 scripts 修改一下
```json
  "scripts": {
    "dev": "webpack-dev-server --config=config/webpack.dev.js --mode=development",
    "build": "webpack --config=config/webpack.dev.js --mode=production"
  },
```
现在可以通过 `$ npm run dev` 来启动项目了，相当于`$ webpack-dev-server --config=config/webpack.dev.js --mode=development`

通过`$ npm run build` 可以打包项目 相当于`$ webpack --config=config/webpack.dev.js --mode=production`