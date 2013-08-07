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
    'models/accessory/SearchModel'
], function($, _, Backbone, dispatcher, CodeModel, 
    CodeCollection, LanguageCollection, CodeFormTemplate, 
    CodeMirrorView, EditorConfigView, SearchModel
    ){
	var codeFormView = Backbone.View.extend({

        // el : '#content',
        id: 'code_form',
        events: {
            'click .code_form_submit': 'submitForm',
            'blur #code_key': 'checkKey'
        },
        
		initialize: function(){
            this._childViews = {};
            _.bindAll(this, 'checkKey');
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
            
            this.$('.form_tooltip').tooltip();
            this.$('#editor_configs').html(this._childViews.editorConfig.$el);
            
            return this;
        },

        addEditor: function(){
            var fragment = this.options.fragment || '';
            this._childViews.codemirror = new CodeMirrorView({fromTextarea: true, value: fragment, mode: this.$('.code_form_language').val(), el: '#codemirror_div'});    
        },
        
        toggleStatus: function(e){
            var element = $(e.currentTarget).find('span');
            if(!element.hasClass('checked')){
                element.addClass('checked');
                this.$('.code_form_status_text_private').show();
                this.$('.code_form_status_text_public').hide();
                element.find('input').val(1);
            }else{
                element.removeClass('checked');
                this.$('.code_form_status_text_private').hide();
                this.$('.code_form_status_text_public').show();
                element.find('input').val(0);
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
                status: this.$('.code_form_status').find('input').val()
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

        checkKey: function(e){
            var t = $(e.currentTarget);

            var that = this;
            var keyCode = t.val();
            var searchModel = new SearchModel({searchType: 'keycodecount', searchKeywords: keyCode});
            searchModel.fetch({
                success: function(model, response, options){
                    // 
                    if(0 !== parseInt(response)){
                        // 
                        bootbox.alert('Someone has already used this key, please use another special one.', function(){
            
                        });
                        t.attr('disabled', false);
                        // remove the loading icon
                        t.siblings('img').remove();
                    }else{
                        // alert('');
                        bootbox.alert('Try to remember this key that index your history codes in the future.');
                        t.attr('disabled', false).siblings('img').remove();
                        that.$el.find('.code_form_submit').removeClass('disabled').attr('disabled', false);
                        // keep this key into local database

                    }
                }
            });
            // load loading icon after the text box and disable the submit button
            t.attr('disabled', true).after('<img src="/images/loading_icon.gif" />');
            this.$el.find('.code_form_submit').addClass('disabled').attr('disabled', true);
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