//main.js
define(['mod1', 'mod2'], function(mod1, mod2) {
    //运行至此，mod1.js 和 mod2.js 已经下载完成；
    //mod1、mod2 两个模块已经执行完，直接可用；

    console.log('require module: main');

    mod1.hello();
    mod2.hello();

    return {
        hello: function() {
            console.log('hello main');
        }
    };
});