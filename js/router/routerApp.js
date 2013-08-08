define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'models/code/CodeModel',
    'views/MainMenuView',
], function($, _, Backbone, dispatcher, CodeModel, MainMenuView){
    var AppRouter = Backbone.Router.extend({
        
        routes: {
            "tool": "showTools",
            "about": "showAbout",
            "help": "showHelp",
            'codes': 'showCodes',
            'code/:id(/:active)': 'selectCode',
            'board': 'addCode',
            ":year(/:month)": "getCodesByDate",
            '': 'addCode'
        },

        initialize: function(){
            this.mainMenu = new MainMenuView();
        },

        selectCode: function(id, active){
            // imit one request for this model
            var code = new CodeModel({id: id});
            code.fetch({
                success: function(code, response, options){
                    dispatcher.trigger('page:viewCode', code, active);
                }
            });
        },

        showCodes: function(){
            this.mainMenu.setLiveNav('codes');
            dispatcher.trigger('page:showCodes');
        },

        addCode: function(){
            this.mainMenu.setLiveNav('board');
            dispatcher.trigger('page:addCode');
        },

        showTools: function(){
            // alert(123);
            this.mainMenu.setLiveNav('tool');
            dispatcher.trigger('page:showTools');
        },
        showHelp: function(){
            // alert(45);
            this.mainMenu.setLiveNav('help');
            dispatcher.trigger('page:showHelp');
        },
        showAbout: function(){
            this.mainMenu.setLiveNav('about');
            dispatcher.trigger('page:showAbout');
        },

        getCodesByDate: function(year, month){
            this.mainMenu.setLiveNav('codes');
            dispatcher.trigger('page:showCodes', {year:year, month:month});
        },

        defaultRoute: function(){
            
        }
    });
    return AppRouter;
});