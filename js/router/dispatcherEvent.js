define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var dispatcher = Backbone.Events;
    
    // public event
    dispatcher.on('loading:start', function(){
        // alert(123);
        if($('body').find('#data_processing').length < 1){
            $('body').append('<div id="data_processing" style="position:fixed;top:10px;left:30px;"><img src="/images/loading.gif" /></div>');
        }
    });

    dispatcher.on('load:editor', function(options){
        // load codeMirror view
        // var codeMirror = new CodeMirrorView(options);
        
    });

    dispatcher.on('loading:end', function(){
        // alert(456);
        $('body').find('#data_processing').remove();
    });



    return dispatcher;
});