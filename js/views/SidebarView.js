define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'views/code/CodeTimeStatisticView',
    'text!templates/SidebarTemplate.html'
], function($, _, Backbone, dispatcher, CodeTimeStatisticView, SidebarTemplate){
    var sidebarView = Backbone.View.extend({
        
        el: '#sidebar',

        events: {
        },

        initialize: function(){
            this.render();
        },

        render: function(){

            // load self
            this.$el.append(SidebarTemplate);
            // load child views
            var codeTimeStatisticView = new CodeTimeStatisticView({model: this.options.codeTimeStatisticModel});


            this.$el.prepend(codeTimeStatisticView.$el);



            return this;
        },
    });

    return sidebarView;
});