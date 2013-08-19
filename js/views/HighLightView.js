define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/accessory/CodeResultTemplate.html'
], function($, _, Backbone, dispatcher, CodeResultTemplate){
    var highLightView = Backbone.View.extend({
        
        el: '#high_light',

        events: {
        },

        initialize: function(){
            _.bindAll(this, 'runCode', 'removeCode');
            dispatcher.on('highlightview:runcode', this.runCode);
            dispatcher.on('highlight:removecoderesult', this.removeCode);
            this.render();
        },

        render: function(){

            // load self
            
        },

        runCode: function(html){
            this.$el.html(CodeResultTemplate);
            this.$('#result_area').html(html);
        },

        removeCode: function(){
            this.$el.html('');
        },

        remove: function(){
            dispatcher.off('highlightview:runcode');
        }

    });

    return highLightView;
});