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
 
