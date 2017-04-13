//mod1.js
define('mod1', [], function() {
    console.log('require module: mod1');

    return {
        hello: function() {
            console.log("hello mod1");
        }
    };
});