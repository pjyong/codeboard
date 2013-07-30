require.config({
    baseUrl: './js',
    paths: {
        jquery: 'libs/jquery-min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        localStorage: 'libs/backbone.localStorage',
        paginator: 'libs/backbone.paginator',
        text: 'libs/text',
        'bootstrap.lib': 'libs/bootstrap.min',
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
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        
    },
});

require([
    'router/dispatcherEvent',
    'views/ContentView',
    'views/MainMenuView',
    'views/SidebarView',
    'models/code/CodeTimeStatisticModel',
    'router/routerApp',
    'libs/jquery.timeago',
    'bootstrap.lib'
 ], function(dispatcher, ContentView, MainMenuView, SidebarView, CodeTimeStatisticModel, Router){
    require(['libs/codemirror'], function(){
        require([
            'libs/mode/javascript',
            'libs/mode/php',
            'libs/mode/sql',
            'libs/mode/yaml',
            'libs/mode/xml',
            'libs/mode/css',
            'libs/mode/clike',
            'libs/mode/matchbrackets',
            'libs/mode/placeholder',
        ]);
    });
    
    Backbone.View.prototype.destroy = function(){
        // if the view has child views
        // if(!_.isUndefined(this._childViews)){
        //     var that = this;
        //     _.each(this._childViews, function(value, key){
        //         value.undelegateEvents();
        //         value.remove();
        //         value.off();
        //     });
        //     // 
        //     // delete that._childViews;
        //     // that._childViews = {};
        // }
        this.undelegateEvents();
        this.remove();
        this.off();
    };


    // register new event(fetch) into Model and Collection
    _.each(["Model", "Collection"], function(name){
        // cache Backbone constructor
        var ctor = Backbone[name];
        // cache original fetch
        var fetch = ctor.prototype.fetch;

        // override the fetch method and emit a fetch event
        ctor.prototype.fetch = function(){
            this.trigger('fetch', this);
            return fetch.apply(this, arguments);
        };
    });
    // load statictis of codes
    var codeTimeStatisticModel = new CodeTimeStatisticModel();
    codeTimeStatisticModel.fetch();

    // load rooted views
    var contentView = new ContentView({codeTimeStatisticModel: codeTimeStatisticModel});
    // contentView.render();
    var mainMenuView = new MainMenuView();

    var sidebarView = new SidebarView({codeTimeStatisticModel: codeTimeStatisticModel});

    // load router
    var router = new Router();
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;
    Backbone.history.start();
    
    
    // window view
    $(window).scroll(function(){
        var triggerPoint = 100;
        if($(this).scrollTop() + triggerPoint > $(this).height() ) {
            // load more code list 
            dispatcher.trigger('view:loadmorecodes');
        }
    });
    

    

    
});
