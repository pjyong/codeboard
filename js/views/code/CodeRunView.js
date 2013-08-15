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
        },
        
        initialize: function(){
            

            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(CodeRunTemplate);
        
            this.$el.html(compiledTemplate);
            return this;
        },
    });
    return codeRunView;
});