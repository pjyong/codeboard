define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'router/routerApp',
    'text!templates/accessory/CodeMirrorTemplate.html',
    'collections/accessory/ConfigCollection',
], function($, _, Backbone, dispatcher, Router, CodeMirrorTemplate, ConfigCollection){
    var codeMirrorView = Backbone.View.extend({
        
        activeLine: [],

        events: {
            'click .CodeMirror': 'calculateCodeRow'
        },

        initialize: function(){
            this._childViews || (this._childViews = {});
            var that = this;
            // add combined keys event
            var defaultOptions = {
                lineNumbers: true,
                extraKeys: {
                    'Ctrl-Up': function(cm) {
                        that.enterFullScreen();
                    },
                    'Ctrl-Down': function(cm){
                        that.quitFullScreen();
                    }
                },
            };
            // this.model = new EditorStatusModel();
            // this.listenTo(this.model, 'change');
            // console.log(Router);
            _.bindAll(this, 'calculateCodeRow', 'setNavigation', 'changeMode', 'changeTheme');

            if(!_.isUndefined(this.options.activeStr)){
                this.getNavigation(this.options.activeStr);
            }
            this.options.fromTextarea || (this.options.fromTextarea = false);
            if(this.options.fromTextarea){
                this.listenTo(dispatcher, 'editor:changemode', this.changeMode);
                defaultOptions.placeholder = 'CodeBoard here...';
            }
            this.listenTo(dispatcher, 'editor:changetheme', this.changeTheme);
            this.id = this.options.id;
            

            
            _.extend(defaultOptions, this.options);

            this.editor = CodeMirror(this.$el[0], defaultOptions);

            // console.log(defaultOptions);
            if(defaultOptions.mode === 'application/x-httpd-php' || defaultOptions.mode === 'javascript'){
                dispatcher.trigger('sidebar:loadrunview', {mode: defaultOptions.mode, editor: this.editor});
            }else{
                dispatcher.trigger('sidebar:removerunview');
            }


            // send over signal to editorConfigView
            // dispatcher.trigger('editor:changetheme2');
            this.editor.on('change', function(instance){
                // console.log();
                var lines = instance.lineCount();
                var chars = instance.getValue().length;
                $('#codemirror_div .char_statistic .statistic_text').html(chars+' characters / '+lines+' lines');
            });

            // if activeline preset
            var that = this;
            if(_.isUndefined(this.options.theme)){
                // if no given value
                // catch the local editor config
                var websiteConfig = new ConfigCollection();
                websiteConfig.fetch({success: function(collection){
                    that.changeTheme({editorTheme: collection.fetchLocalTheme()});
                }});
            }


            if(this.activeLine.length > 0){
                _.each(this.activeLine, function(line){
                    line = line - 1;
                    var lineHandle = that.editor.getLineHandle(line);
                    that.editor.addLineClass(lineHandle, "background", 'codemirror_active_background');            
                });
            }


            this.render();
        },

        render: function(){
            var compiledTemplate = _.template(CodeMirrorTemplate, {chars: this.options.value.length,lines: this.editor.lineCount()});
            this.$el.append(compiledTemplate);

            return this; 
        },
        changeMode: function(options){
            this.editor.setOption('mode', options.mode);
            // if the language is javascript or php, sidebar load run button view
            if(options.mode === 'application/x-httpd-php' || options.mode === 'javascript'){
                dispatcher.trigger('sidebar:loadrunview', {mode: options.mode, editor: this.editor});
            }else{
                dispatcher.trigger('sidebar:removerunview');
            }
        },

        changeTheme: function(options){
            // three themes
            this.editor.setOption('theme', options.editorTheme);
            // this.$el.addClass(options.editorTheme);
        },
        enterFullScreen: function(){
            this.$el.addClass('editor_fullscreen');
            dispatcher.trigger('editor:enterfullscreen');
            // this._childViews.editorConfig = new EditorConfigView();
            // this.$('#editor_config_view').html(this._childViews.editorConfig.$el);
        },



        quitFullScreen: function(){
            this.$el.removeClass('editor_fullscreen');
            dispatcher.trigger('editor:quitfullscreen');
            // this._childViews.editorConfig.destroy();
        },


        calculateCodeRow: function(){
            if(!this.options.fromTextarea){
                // bind the click event for code line
                var line = this.editor.getCursor().line;
                var realLine = line + 1;
                var lineHandle = this.editor.getLineHandle(line);
                var indexKey = _.indexOf(this.activeLine, realLine);
                // if active line exists
                if(-1 !== indexKey){
                    // cacel
                    this.activeLine.splice(indexKey, 1);
                    this.editor.removeLineClass(lineHandle, "background", 'codemirror_active_background');
                }else{
                    // add
                    this.activeLine.push(realLine);
                    this.editor.addLineClass(lineHandle, "background", 'codemirror_active_background');
                }
                this.setNavigation();
            }
        },

        getNavigation: function(navStr){
            this.activeLine = [];
            // 
            var that = this;
            var tempArray = navStr.split(',');
            if(tempArray[0]){
                _.each(tempArray, function(value){
                    if(/-/.test(value)){
                        var tempArray2 = value.split('-');
                        var begin = parseInt(tempArray2[0]);
                        var end = parseInt(tempArray2[1]);
                        for(var i = begin; i <= end; i++){
                            that.activeLine.push(i);
                        }
                    }else{
                        that.activeLine.push(parseInt(value));
                    }
                });
            }
        },

        setNavigation: function(){
            
            var orderActiveLine = _.sortBy(this.activeLine, function(line){return line;});
            var navStr = '';
            var tempLine = false;
            _.each(orderActiveLine, function(value, index){
                if(0 === index){
                    navStr += value;
                }else{
                    if(value - 1 === orderActiveLine[index - 1]){
                        tempLine = true;
                    }else{
                        if(tempLine){
                            navStr += '-' + orderActiveLine[index - 1];
                        }
                        navStr += ',' + value;
                        tempLine = false;
                    }
                }   
            });
            if(tempLine){
                navStr += '-' + orderActiveLine[orderActiveLine.length - 1]
            }
            var router = new Router();
            if(navStr !== ''){
                navStr = '/' + navStr;
            }
            router.navigate('code/' + this.id + navStr);
            // dispatcher.trigger('navigate', {url:});

        },

        remove: function(){
            // remove the event
            Backbone.View.prototype.remove.apply(this);
            dispatcher.trigger('sidebar:removerunview');
        }
        
    });
 
    return codeMirrorView;
} );