//mod2.js
define('mod2', ['mod1'], function() {
    console.log('require module: mod2');

    return {
        hello: function() {
            console.log("hello mod2");
        }
    };
});