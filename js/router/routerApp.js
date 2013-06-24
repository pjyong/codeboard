define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'models/code/CodeModel',
], function($, _, Backbone, dispatcher, CodeModel){
    var AppRouter = Backbone.Router.extend({
        
        routes: {
            'codes': 'showCodes',
            'code/:id(/:active)': 'selectCode',
            'board': 'addCode',
            ":year(/:month)": "getCodesByDate",
            "tool": "showTools",
            "about": "showAbout",
            "help": "showHelp",
            '*actions': 'addCode',
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
            dispatcher.trigger('page:showCodes');
        },

        addCode: function(){
            dispatcher.trigger('page:addCode');
        },

        showTools: function(){
            dispatcher.trigger('page:showTools');
        },
        showHelp: function(){
            // alert(45);
            dispatcher.trigger('page:showHelp');
        },
        showAbout: function(){
            dispatcher.trigger('page:showAbout');
        },

        getCodesByDate: function(year, month){
            dispatcher.trigger('page:showCodes', {year:year, month:month});
        },

        defaultRoute: function(){
            
        }
    });
    return AppRouter;
});