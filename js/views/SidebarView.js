define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'views/code/CodeTimeStatisticView',
], function($, _, Backbone, dispatcher, CodeTimeStatisticView){
    var sidebarView = Backbone.View.extend({
        
        el: '#sidebar',

        events: {
        },

        initialize: function(){
            this.render();
        },

        render: function(){

            // load self

            // load child views
            var codeTimeStatisticView = new CodeTimeStatisticView({model: this.options.codeTimeStatisticModel});

            this.$el.append(codeTimeStatisticView.$el);



            return this;
        },
    });

    return sidebarView;
});