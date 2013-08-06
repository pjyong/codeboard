define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
], function($, _, Backbone, dispatcher){
    var mainMenuView = Backbone.View.extend({
        
        el: '#main_nav',

        events: {
        },

        initialize: function(){
            // _.bindAll(this, 'setLiveNav');
            this.render();
        },

        render: function(){

            return this;
        },

        setLiveNav: function(menuName){
            this.$('a').removeClass('live');
            this.$('a[href="#/'+menuName+'"]').addClass('live');
        },


    });

    return mainMenuView;
});