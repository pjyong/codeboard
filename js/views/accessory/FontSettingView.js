define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/accessory/FontSettingTemplate.html',
], function($, _, Backbone, dispatcher, FontSettingTemplate){
    var fontSettingView = Backbone.View.extend({
        
        id : 'font_setting',

        events: {
            'click button': 'submitFontSetting'
        },
        
        initialize: function(){
            this.enabled = false;
            this.render();
        },
        render: function(){

            var compiledTemplate = _.template(FontSettingTemplate, {});
            this.$el.html(compiledTemplate);

            if(!this.enabled){
                this.$el.hide();
            }

            // because when its parent view re-render, all of the dom will be removed
            this.delegateEvents();
            
            return this;
        },

        submitFontSetting: function(){
            // chnage theme of codemirror
            $('.CodeMirror').css('font-size', this.$('#fsize').val());

            return this;
        },

        switchView: function(){
            if(this.enabled){
                this.$el.hide();
            }else{
                this.$el.show();
            }
            this.enabled = !this.enabled;

            return this;
        },
    });

    return fontSettingView;
});