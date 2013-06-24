define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var editorStatusModel = Backbone.Model.extend({

        defaults: {
            editorTheme: '',
        },

        initialize: function(){
            
        },
    });

    return editorStatusModel;
});