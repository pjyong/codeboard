define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'views/code/CodeTimeStatisticView',
    'views/code/CodeRunView',
    'text!templates/SidebarTemplate.html'
], function($, _, Backbone, dispatcher, CodeTimeStatisticView, CodeRunView, SidebarTemplate){
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
            var codeRunView = new CodeRunView();
            var codeTimeStatisticView = new CodeTimeStatisticView({model: this.options.codeTimeStatisticModel});
            console.log(codeRunView);
            this.$el.prepend(codeTimeStatisticView.$el);
            this.$el.prepend(codeRunView.$el);



            return this;
        },
    });

    return sidebarView;
});