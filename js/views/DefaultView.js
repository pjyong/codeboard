define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var defaultView = Backbone.View.extend({
        
        render: function(){
            return this.$el.html('default view');
        }
    });

    return defaultView;
});