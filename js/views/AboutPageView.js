define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/AboutPageTemplate.html',
], function($, _, Backbone, dispatcher, AboutPageTemplate){
    var sidebarView = Backbone.View.extend({

        events: {
        },
        className: 'page_body',
        initialize: function(){
            this.render();
        },

        render: function(){

            

            this.$el.html(AboutPageTemplate);



            return this;
        },
    });

    return sidebarView;
});