({
    appDir: './',
    baseUrl: "./",
    dir: "./dist",
    
    removeCombined: true,
    optimizeCss: 'standard',
    fileExclusionRegExp: /^build\.js|r\.js|bootstrap\.js$/,
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
        text: 'libs/text',
        'bootstrap.lib': 'libs/bootstrap.min',
        'jquery.gritter': 'libs/jquery.gritter.min',
    },
    
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        'bootstrap.lib': {
            deps: ['jquery']
        },
        'jquery.gritter': {
            deps: ['jquery']
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }        
    },
})