define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/ToolPageTemplate.html',
], function($, _, Backbone, dispatcher, ToolPageTemplate){
    var sidebarView = Backbone.View.extend({

        events: {
        },
        className: 'page_body',
        initialize: function(){
            this.render();
        },

        render: function(){

            

            this.$el.html(ToolPageTemplate);



            return this;
        },
    });

    return sidebarView;
});