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
            this._childViews = {};
            _.bindAll(this, 'loadRunView', 'removeRunView');
            dispatcher.on('sidebar:loadrunview', this.loadRunView);
            dispatcher.on('sidebar:removerunview', this.removeRunView);

            this._childViews.codeTimeStatisticView = new CodeTimeStatisticView({model: this.options.codeTimeStatisticModel});
            this.render();
        },

        render: function(){

            // load self
            this.$el.append(SidebarTemplate);
            // load child views
            
            this.$el.prepend(this._childViews.codeTimeStatisticView.$el);
            
            return this;
        },


        loadRunView: function(options){
            if(!_.isUndefined(this._childViews.codeRunView)){
                this._childViews.codeRunView.refreshOptions(options);
            }else{
                this._childViews.codeRunView = new CodeRunView(options);
                this.$el.prepend(this._childViews.codeRunView.$el);
            }
        },

        removeRunView: function(){
            if(!_.isUndefined(this._childViews.codeRunView)){
                this._childViews.codeRunView.destroy();
                delete this._childViews.codeRunView;
                
            }
        }

    });

    return sidebarView;
});