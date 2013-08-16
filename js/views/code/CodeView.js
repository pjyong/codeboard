define([
	'jquery',
	'underscore',
	'backbone',
    'router/dispatcherEvent',
	'models/code/CodeModel',
	'text!templates/code/CodeTemplate.html',
    'views/accessory/FontSettingView',
    'views/code/CodeToolView',
    'views/accessory/CodeMirrorView',
], function($, _, Backbone, dispatcher, CodeModel, CodeTemplate, 
    FontSettingView, CodeToolView, CodeMirrorView){
    var codeView = Backbone.View.extend({

        events: {
            'click .sizer': 'switchFontView',
            'click #fullscreen': 'toggleFullscreen',
        },

        _childViews: {},

        initialize: function(){
            _.bindAll(this, 'render', 'switchFontView', 'toggleFullscreen', 'addCodeMirror');

            this.model = this.options.model;
            this.model.on('change', this.render, this);

            // font setting view
            this._childViews.fontSetting = new FontSettingView();
            
            // render code tools view
            this._childViews.codeTool = new CodeToolView({model: this.model});

            this.render();  
        },

        render: function(){
    

            var compiledTemplate = _.template(CodeTemplate, this.model.toJSON());
            this.$el.html(compiledTemplate);
            this.$('span.code_created').timeago();
            this.$('.sizer').tooltip();
            
            this.$('.code_body').prepend(this._childViews.fontSetting.$el);

            this.$('.tools').html(this._childViews.codeTool.$el); 
             
            return this;
		},

        switchFontView: function(){
            this._childViews.fontSetting.switchView();
        },

        toggleFullscreen: function(){
            this.fullscreen || (this.fullscreen = false);
            if(this.fullscreen){
                var width = document.body.clientWidth;
                var marginLeft = (width - 960)/2;
                $('#content').animate({width: '730px', marginLeft: marginLeft}, 2000, function(){
                    $('body').removeClass('fullscreen');
                    $(this).css({marginLeft: '0px'});
                });
                this.fullscreen = false;
            }else{
                $('body').addClass('fullscreen');
                var width = document.body.clientWidth;
                var marginLeft = (width - 960)/2;
                $('#content').css({marginLeft:marginLeft}).animate({width: width - 100, marginLeft:'0px'}, 2000);
                this.fullscreen = true;
            }

            return this;
        },

        // why I didn't excute it in render function, that's because CodeMirror must be render on PAGE LEVEL
        // in other words, the codeView must be added page
        addCodeMirror: function(options){
            var local = {
                value: this.model.get('fragment'),
                id: this.model.get('id'),
                mode: this.model.get('language'),
                readOnly: 'nocursor',
                el: '#code_mirror_detail'
            };

            _.extend(local, options);

            this._childViews.codeMirror = new CodeMirrorView(local);

        },

	});

	return codeView;
});