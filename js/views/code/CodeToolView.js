define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'models/code/CodeModel',
    'text!templates/code/CodeToolTemplate.html',
], function($, _, Backbone, dispatcher, CodeModel, CodeToolTemplate){
    var codeToolView = Backbone.View.extend({

        events: {
            'click .reboard_button>a': 'reboardCode',
        },

        initialize: function(){
            _.bindAll(this, 'render', 'reboardCode');
            this.model = this.options.model;
            
            this.render();
        },

        render: function(){
            var compiledTemplate = _.template(CodeToolTemplate, this.model.toJSON());
            this.$el.html(compiledTemplate);
            this.$el.find('.tool a').tooltip();
            this.delegateEvents();
            return this;
        },

        reboardCode: function(e){
            e.preventDefault();
            // get current code fragment
            var fragment = this.model.get('fragment');

            dispatcher.trigger('page:addCode', {fragment: fragment, language:this.model.get('language')});
            
            // trigger the code add form

            return this;
        },
    });

    return codeToolView;
});