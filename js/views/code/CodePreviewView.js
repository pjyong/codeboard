define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'models/code/CodeModel',
    'text!templates/code/CodePreviewTemplate.html',
    'views/code/CodeToolView',
], function($, _, Backbone, dispatcher, CodeModel, CodePreviewTemplate, CodeToolView){
    var codePreviewView = Backbone.View.extend({

        className: 'code_preview',
        events: {
           
        },

       

        initialize: function(){
            _.bindAll(this, 'render');
            this._childViews = {};
            this.model = this.options.model;
            this.listenTo(this.model, 'change', this.render);
            // this.model.on('change', this.render, this);
            // this.model.on('destroy', this.destroy);
            this.model.collection.on('reset', this.destroy, this);
            
            // render code tools view
            this._childViews.codeTool = new CodeToolView({model: this.model});

            this.render(); 
            
        },
   

        render: function(){

            var compiledTemplate = _.template(CodePreviewTemplate, this.model.toJSON());
            this.$el.html(compiledTemplate);
            this.$('span.code_created').timeago();

            
            this.$('.tools').html(this._childViews.codeTool.$el);
            
            return this;
        },
    });

    return codePreviewView;
});