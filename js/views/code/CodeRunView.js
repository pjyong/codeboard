define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/code/CodeRunTemplate.html',
], function($, _, Backbone, dispatcher, CodeRunTemplate){
    var codeRunView = Backbone.View.extend({
        
        id: 'code_run',
        className: 'block',
        events: {
            'click .run-button': 'runCode'
        },
        
        initialize: function(options){
            _.bindAll(this, 'runCode');
            this.editor = options.editor;
            this.mode = options.mode;

            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(CodeRunTemplate);
            
            this.$el.html(compiledTemplate);
            return this;
        },

        refreshOptions: function(options){
            this.mode = options.mode;
        },

        runCode: function(){
            // open new window page
            // change high light area
            // alert(this.mode);
            // alert(this.editor.getValue());

            var responseText = '';
            if($.trim(this.editor.getValue()) === ''){
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '',
                    image: '/images/start_here_64.png',
                    class_name: 'codeboard-warning',
                    // (string | mandatory) the text inside the notification
                    text: '<strong>Warning</strong> Please input some code.',
                    // class_name: 'gritter-success'
                });
                return;
            }
            if(this.mode === 'javascript'){
                // replace console.log();
                
                responseText = '<script type="text/javascript">' + this.editor.getValue() + '</script>';
                dispatcher.trigger('highlightview:runcode', responseText);
            }else if(this.mode === 'application/x-httpd-php' || this.mode === 'php'){
                // check
                // if this string doesn't contain '<?php'
                if(!/^<\?php/.test(this.editor.getValue())){
                    $.gritter.add({
                        // (string | mandatory) the heading of the notification
                        title: '',
                        image: '/images/start_here_64.png',
                        class_name: 'codeboard-warning',
                        // (string | mandatory) the text inside the notification
                        text: '<strong>Warning</strong> Please add <em>"&lt;?php"</em> in front of code.',
                        // class_name: 'gritter-success'
                    });
                    return;
                }
                // if this string contains some not-allowed php functions
                dispatcher.trigger('loading:start');
                $.ajax('run', {data:{phpcode: this.editor.getValue()}, dataType: 'html', type: 'post'}).done(function(html){
                    responseText = html;
                    dispatcher.trigger('loading:end');
                    dispatcher.trigger('highlightview:runcode', responseText);
                    // 
                });

            }
        }
    });
    return codeRunView;
});