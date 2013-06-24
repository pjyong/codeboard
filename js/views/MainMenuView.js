define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
], function($, _, Backbone, dispatcher){
    var mainMenuView = Backbone.View.extend({
        
        el: '#main_nav',

        events: {
            'click .share_page': 'addCode',
            'click .codes_page': 'showCodes',

            'click .tools_page': 'showToolPage',
            'click .help_page': 'showHelpPage',
            'click .about_page': 'showAboutPage',
        },

        initialize: function(){
            _.bindAll(this, 'showCodes', 'addCode', 'showAboutPage', 'showHelpPage', 'showToolPage');
            this.render();
        },

        render: function(){

            return this;
        },

        addCode: function(e){
            // prevent the default href jump
            e.preventDefault();
            var ct = $(e.currentTarget);
            if(!ct.hasClass('live')){
                this.$('a').removeClass('live');
                ct.addClass('live');
                // trigger the event that defined by contentview
                dispatcher.trigger('page:addCode');
            }
        },

        showCodes: function(e){
            // prevent the default href jump
            e.preventDefault();
            var ct = $(e.currentTarget);
            if(!ct.hasClass('live')){
                this.$('a').removeClass('live');
                ct.addClass('live');
                dispatcher.trigger('page:showCodes');
            }
        },
        showAboutPage: function(e){
            // prevent the default href jump
            e.preventDefault();
            var ct = $(e.currentTarget);
            this.$('a').removeClass('live');
            ct.addClass('live');
            dispatcher.trigger('page:showAbout');
        },
        showToolPage: function(e){
            // prevent the default href jump
            e.preventDefault();
            var ct = $(e.currentTarget);
            this.$('a').removeClass('live');
            ct.addClass('live');
            dispatcher.trigger('page:showTools');
        },
        showHelpPage: function(e){
            // prevent the default href jump
            e.preventDefault();
            var ct = $(e.currentTarget);
            this.$('a').removeClass('live');
            ct.addClass('live');
            dispatcher.trigger('page:showHelp');
        },
    });

    return mainMenuView;
});