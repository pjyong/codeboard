define([
    'jquery',
    'underscore',
    'backbone',
    // '/js/models/accessory/LoadingDivModel.js',
    'text!templates/accessory/LoadingDivTemplate.html'
], function($, _, Backbone, LoadingDivTemplate){

    var loadingDivView = Backbone.View.extend({
        // tagName: 'span',
        attributes: {
            id: 'loading_div'
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            var compiledTemplate = _.template(LoadingDivTemplate, {});
            this.$el.html(compiledTemplate);
            
            return this; 
        },

        show: function(){
            this.$el.show();

            return this;
        },

        hide: function(){
            this.$el.hide();

            return this;
        }
        
    });
 
    return loadingDivView;
});