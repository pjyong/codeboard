define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/HelpPageTemplate.html',
], function($, _, Backbone, dispatcher, HelpPageTemplate){
    var sidebarView = Backbone.View.extend({

        events: {
        },

        className: 'page_body',

        initialize: function(){
            this.render();
        },

        render: function(){

            

            this.$el.html(HelpPageTemplate);



            return this;
        },
    });

    return sidebarView;
});