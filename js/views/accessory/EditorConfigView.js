define([
    'jquery',
    'underscore',
    'backbone',
    
    'collections/code/LanguageCollection',
    'collections/accessory/ConfigCollection',
    'text!templates/accessory/EditorConfigTemplate.html',
    'router/dispatcherEvent',
], function($, _, Backbone, LanguageCollection, ConfigCollection, EditorConfigTemplate, dispatcher){
    var editorConfigView = Backbone.View.extend({
        
        

        events: {
            'change .code_form_language': 'changeEditorMode',
            'change .local_theme': 'changeEditorTheme',
            'click #submit_e_config': 'submitEditorConfig',
        },
        
        initialize: function(){
            _.bindAll(this, 'changeEditorMode', 'changeEditorTheme', 'submitEditorConfig');

            // get selected language
            this.options.language || (this.options.language = '');
            // listen to the editor is loaded
            // this.listenTo(dispatcher, 'editor:changetheme2', this.returnChangeTheme);
            // get website config
            // this.websiteConfig = new ConfigCollection();
            // this.websiteConfig.fetch();
            this.websiteConfig = this.options.websiteConfig;

            var that = this;
            this.collection = new LanguageCollection();
            this.collection.fetch({
                success: function(data){
                    // var fragment = that.options.fragment || '';
                    // trigger parent render
                    that.render();
                    // respone to content view a Yes Render signal
                    // that._childViews.codemirror = new CodeMirrorView({fromTextarea: true, value: fragment, mode: that.$('.code_form_language').val(), el: '#codemirror_div'});
                    dispatcher.trigger('view:rendercontentview', {codeform: true});
                }
            });
        },
        render: function(){
            var languages = this.collection.toJSON();
            var editorTheme = '';
            if(this.options.language === ''){
                var languageConfig = this.websiteConfig.findWhere({option:'language'});
                if(!_.isUndefined(languageConfig)){
                    this.options.language = languageConfig.get('value');
                }
            }
            var editorThemeConfig = this.websiteConfig.findWhere({option:'editorTheme'});
            if(!_.isUndefined(editorThemeConfig)){
                editorTheme = editorThemeConfig.get('value');
                // dispatcher.trigger('editor:changetheme', {editorTheme: editorTheme});
                console.log(editorTheme);
            }
            var compiledTemplate = _.template(EditorConfigTemplate, 
                {languages: languages, editorTheme: editorTheme, 
                    selected: this.options.language});
            this.$el.html(compiledTemplate);

            

            // because when its parent view re-render, all of the dom will be removed
            this.delegateEvents();
            
            return this;
        },
        changeEditorMode: function(e){
            var language = $(e.currentTarget).val();
            var mode = this.collection.findWhere({language: language}).get('mode');
            dispatcher.trigger('editor:changemode', {mode: mode});
            // this._childViews.codemirror.editor.setOption('mode', this.$('.code_form_language').val());
        },

        changeLanguage: function(language){
            this.$('.code_form_language').val(language);
        },

        changeEditorTheme: function(e){
            var editorTheme = $(e.currentTarget).val();
            dispatcher.trigger('editor:changetheme', {editorTheme: editorTheme});
        },

        // returnChangeTheme: function(){
        //     var editorTheme = this.$('.local_theme').val();
        //     dispatcher.trigger('editor:changetheme', {editorTheme: editorTheme});
        // },

        submitEditorConfig: function(){
            // get language option
            this.websiteConfig.updateConfig('language', this.$('.code_form_language').val());
            // get editor theme option
            this.websiteConfig.updateConfig('editorTheme', this.$('.local_theme').val());
            // this.websiteConfig.updateConfig('localCodes', '155,154');
        },
        
    });

    return editorConfigView;
});