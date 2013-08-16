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
            _.bindAll(this, 'loadRunView', 'removeRunView');
            dispatcher.on('sidebar:loadrunview', this.loadRunView);
            dispatcher.on('sidebar:removerunview', this.removeRunView);

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


        loadRunView: function(options){
            if(!_.isUndefined(this.codeRunView)){
                this.codeRunView.refreshOptions(options);
            }else{
                this.codeRunView = new CodeRunView(options);
                this.$el.prepend(this.codeRunView.$el);
            }
        },

        removeRunView: function(){
            if(!_.isUndefined(this.codeRunView)){
                this.codeRunView.destroy();
                delete this.codeRunView;
                
            }
        }

    });

    return sidebarView;
});