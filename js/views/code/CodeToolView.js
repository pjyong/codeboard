define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'models/code/CodeModel',
    'text!templates/code/CodeToolTemplate.html',
], function($, _, Backbone, dispatcher, CodeModel, CodeToolTemplate){

    function getEmbedCode(id){
        var code = '<script type="text/javascript" src="http://codeboard.org/code/javascript/' + id + '.js"></script>';
        code = '<textarea>' + code + '</textarea>';
        return code;
    }

    var codeToolView = Backbone.View.extend({

        events: {
            'click .reboard_button>a': 'reboardCode',
            'click .embed_button>a': 'showEmbedCode',
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
            var content = getEmbedCode(this.model.get('id'));
            this.$el.find('.embed_button>a').popover({html: true, content: content, trigger: 'click', placement: 'bottom' });
            this.delegateEvents();
            // 
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

        showEmbedCode: function(e){
            e.preventDefault();
        }
    });

    return codeToolView;
});