
接下来讲的是：
polyfile / preset / transform 
这几个可以帮我们去转换最新的语法，比如 es8 的东西可以解析成浏览器可以识别的东西

在 main.js 中的箭头函数添加 一下语法，es8 中出现的 async
```js
// alert('Hello World!')
require('./main.css')
require('./index.html')

let a = async () => {
    await console.log("Hello Future!");
}

```
到.babelrc
```json
{
    "plugins": [
        "transform-es2015-arrow-functions",
        "async-to-promises"
    ]
}
```

```s
    $ npm install babel-plugin-async-to-promises
```
```s
    $ babel src/main.js
    /*
        # 得到如下内容
        // alert('Hello World!')
        require('./main.css');
        require('./index.html');

        let a = function () {
            return Promise.resolve().then(function () {
                return console.log("Hello Future!");
            }).then(function () {});
        };
    */
```

在 main.js 添加console.log
```js
// alert('Hello World!')
require('./main.css')
require('./index.html')

let a = async () => {
    await console.log("Hello Future!");
    console.log("Done")
}

```
```s
    $  babel src/main.js
    # 得到一下内容
    // alert('Hello World!')
    require('./main.css');
    require('./index.html');

    let a = function () {
        return Promise.resolve().then(function () {
            return console.log("Hello Future!");
        }).then(function () {
            console.log("Done");
        });
    };
```

我们可以使用现在这种，不停的往里面装插件
还可以使用 指定一个 `polyfill` 这个可以在转换之前 帮我们预编译这个东西
安装 babel-polyfill
```s
    $ npm install babel-polyfill
``` 
应用到 webpack.dev.js 中
我们可以应用到入口文件中，因为我们的入口文件 有且可以有多个。
```js
    const path = require("path");
    module.exports = {
        entry: {
            main: ["babel-polyfill", "./src/main.js"]
        },
    // ...
``` 
![babel-polyfill](https://raw.githubusercontent.com/lshaohai/webpack4-xu/master/doc/images/babel-polyfill.png)
```js
const path = require("path");
module.exports = {
    entry: {
        // main: ["babel-polyfill", "./src/main.js"]
        main: ["core-js/fn/promise", "./src/main.js"]
    },
``` 
再次运行一下
```s
    $ npm run dev 
``` 
刚刚那个是所有的 es8的语法都会进行编译，而这个仅仅是 编译了 promise 对应的部分
![core-js-fn-promise](https://github.com/lshaohai/webpack4-xu/blob/master/doc/images/core-js-fn-promise.png)



还可以使用一种更好的 `环境变量的方式` 
安装环境变量
```s
    $ npm install babel-preset-env 
``` 
进入 `.babelrc` 将之前的配置删掉，当然你可以使用之前那种方式，不过很麻烦
你想转换任何东西都需要下载安装对应的插件

```s
{
    "presets": [
        [
            "env", 
            {
                "debug": true
            }
        ]
    ]
}
``` 
运行项目
```s
    $ npm run dev
```

![presets](https://github.com/lshaohai/webpack4-xu/blob/master/doc/images/presets.png)

`.babelrc`
```
targets =>
    # 第一个是浏览器支持的版本， 第二个是你要支持一个什么样的浏览器
    # 这样子就可以支持到es5de 语法了
plugins
    # 这个可以解决一下 polyfill打包的 环境变量的污染
```
```s
{
    "presets": [
        [
            "env", 
            {
                "targets": {
                    # 第一个是浏览器支持的版本， 第二个是你要支持一个什么样的浏览器
                    # 这样子就可以支持到es5de 语法了
                    "browsers": ["last 2 versions"]
                },
                "debug": true
            }
        ]
    ],
    "plugins": [
        # 这个可以解决一下 polyfill打包的 环境变量的污染
        "transform-runtime"
    ]
}
```
下载安装 transform-runtime
```s
    $ npm install babel-plugin-transform-runtime
```

main.js
```s
    // alert('Hello World!')


    /*
        将 `runtime` 引入进来
        如果你引入到最上面来，当你打包的时候，它会在你运行的时候，进行一个编译，就是你使用 npm run build的时候会编译你下面的所有代码

        目前这个使用了 es8的内容了，异步、异步等待、解构，这些东西都是最新的东西
   */ 
    
    require("babel-runtime/regenerator")
    require('./main.css')
    require('./index.html')

    let a = async args => {
        const {a , b} = args;
        await console.log("Hello Future!");
        console.log("Done")
    }
    a({a:1, b:2})
```

```s
    $ babel src/main.js 
    运行上面命令：就可以看到下面的结果，这个是浏览器可以识别的语言，而不是我们的es8最新的语法
    `
    require("babel-runtime/regenerator");
    require('./main.css');
    require('./index.html');

    var a = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(args) {
            var a, b;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            a = args.a, b = args.b;
                            _context.next = 3;
                            return console.log("Hello Future!");

                        case 3:
                            console.log("Done");

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function a(_x) {
            return _ref.apply(this, arguments);
        };
    }();
    a({ a: 1, b: 2 });
    `
```
```s
    $ npm run build 
```
![babel-runtime](https://raw.githubusercontent.com/lshaohai/webpack4-xu/master/doc/images/babel-runtime.png)


> 以上讲解了 polyfill 、 presets 、transform 这些东西都有优势和劣势
polyfill这个东西可以给我们生成变量的污染，然后我们可以使用环境变量的形式，使用 `.babelrc` 配置的 `env` 就可以帮助我们自动下载对应的插件 
我们使用 `transform-runtime` 去识别最新的语法，以及去解决，环境变量污染的问题