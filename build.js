({
    appDir: './',
    baseUrl: "./js",
    dir: "./dist",
    
    removeCombined: true,
    optimizeCss: 'standard',
    fileExclusionRegExp: /^build\.js|r\.js|index\.php$/,
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'bootstrap'
        },
    ],
    paths: {
        jquery: 'libs/jquery-min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        localStorage: 'libs/backbone.localStorage',
        paginator: 'libs/backbone.paginator',
        text: 'libs/text',
    },
    
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        
    },
})