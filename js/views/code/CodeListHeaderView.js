define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/code/CodeListHeaderTemplate.html',
], function($, _, Backbone, dispatcher, CodeListHeaderTemplate){
    var codeListHeaderView = Backbone.View.extend({
        
        // el : '#content',
        id: 'code_list_header',
        events: {
        },
        
        initialize: function(){
            this.render();
        },
        render: function(){

            var compiledTemplate = _.template(CodeListHeaderTemplate, {});
        
            this.$el.html(compiledTemplate);
            return this;
        },
    });
    return codeListHeaderView;
});