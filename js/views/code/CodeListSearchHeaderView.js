define([
    'jquery',
    'underscore',
    'backbone',
    // '/js/models/accessory/LoadingDivModel.js',
    'text!templates/code/CodeListSearchHeaderTemplate.html'
], function($, _, Backbone, CodeListSearchHeaderTemplate){

    var CodeListSearchHeaderView = Backbone.View.extend({
        // tagName: 'span',
        attributes: {
            id: 'search_list_header'
        },

        initialize: function(){
            this.searchKeyword = this.options.searchKeyword;

            this.render();
        },

        render: function(){
            var compiledTemplate = _.template(CodeListSearchHeaderTemplate, {searchKeyword: this.searchKeyword});
            this.$el.html(compiledTemplate);
            
            return this; 
        },

        
        
    });
 
    return CodeListSearchHeaderView;
});