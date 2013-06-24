define([
	'jquery',
	'underscore',
	'backbone',
    'router/dispatcherEvent',
    'models/code/CodeModel',
	'collections/code/CodeCollection',
    'collections/code/LanguageCollection',
	'text!templates/code/CodeFormTemplate.html',
    'views/accessory/CodeMirrorView',
    'views/accessory/EditorConfigView',
], function($, _, Backbone, dispatcher, CodeModel, 
    CodeCollection, LanguageCollection, CodeFormTemplate, 
    CodeMirrorView, EditorConfigView
    ){
	var codeFormView = Backbone.View.extend({

        // el : '#content',
        id: 'code_form',
        events: {
            'click .code_form_status': 'toggleStatus',
            'click .code_form_submit': 'submitForm',
            
        },
        
		initialize: function(){
            this._childViews = {};
            this.listenTo(dispatcher, 'view:rendercontentview', this.addEditor);
            this.listenTo(dispatcher, 'editor:enterfullscreen', this.enterFullscreen);
            this.listenTo(dispatcher, 'editor:quitfullscreen', this.quitFullscreen);
            // load child view
            this._childViews.editorConfig = new EditorConfigView({language: this.options.language});
            this.dispatcher = dispatcher;
            this.render();
        },

        render: function(){

            var compiledTemplate = _.template(CodeFormTemplate, {});
            this.$el.html(compiledTemplate);
            

            this.$('#editor_configs').html(this._childViews.editorConfig.$el);
            
            return this;
        },

        addEditor: function(){
            var fragment = this.options.fragment || '';
            this._childViews.codemirror = new CodeMirrorView({fromTextarea: true, value: fragment, mode: this.$('.code_form_language').val(), el: '#codemirror_div'});    
        },
        
        toggleStatus: function(e){
            var element = $(e.currentTarget);
            if(element.prop('checked')){
                this.$('.code_form_status_text_private').show();
                this.$('.code_form_status_text_public').hide();
                element.val(1);
            }else{
                this.$('.code_form_status_text_private').hide();
                this.$('.code_form_status_text_public').show();
                element.val(0);
            }
        },
        enterFullscreen: function(){
            this._childViews.editorConfig.$el.appendTo('#editor_config_view');
        },
        quitFullscreen: function(){
            this._childViews.editorConfig.$el.appendTo('#editor_configs');
        },
        
        submitForm: function(){
            if(_.isUndefined(this.submitTime)){
                this.submitTime = new Date().getTime();
            }else{
                // check the time limitation
                var duration = 30;
                var currentTime = new Date().getTime();
                var t = parseInt((currentTime - this.submitTime)/1000);
                if(t < duration){
                    alert('you need wait ' + (duration-t) + ' seconds');
                    return this;
                }else{
                    this.submitTime = currentTime;
                }
            }
            dispatcher.trigger('loading:start');
            var code = new CodeModel({
                language: this.$('.code_form_language').val(),
                // fragment: this.$('.code_form_fragment').val(),
                fragment: this._childViews.codemirror.editor.getValue(),
                status: this.$('.code_form_status').val()
            });
            var that = this;
            code.save({}, {
                success: function(model, response, options){
                    model.set({id: response});
                    that.dispatcher.trigger('loading:end');
                    // add this model into, from CodeListView
                    dispatcher.trigger('view:addonecode', model);
                }
            });
            
        },

        reboard: function(options){
            this._childViews.codemirror.editor.setValue(options.fragment);
            console.log(options.language);
            this._childViews.editorConfig.changeLanguage(options.language);
            // this.$el.find('.code_form_language').val(options.mode);
            // set editor
            
        },

	});

	return codeFormView;
});