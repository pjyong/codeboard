define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/code/CodeRunTemplate.html',
], function($, _, Backbone, dispatcher, CodeRunTemplate){
    var codeRunView = Backbone.View.extend({
        
        id: 'code_run',
        className: 'block',
        events: {
            'click .run-button': 'runCode'
        },
        
        initialize: function(options){
            _.bindAll(this, 'runCode');
            this.editor = options.editor;
            this.mode = options.mode;

            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(CodeRunTemplate);
            
            this.$el.html(compiledTemplate);
            return this;
        },

        refreshOptions: function(options){
            this.mode = options.mode;
        },

        runCode: function(){
            // open new window page
            alert(this.mode);
            alert(this.editor.getValue());
        }
    });
    return codeRunView;
});