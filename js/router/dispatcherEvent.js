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
            $('body').append('<div id="data_processing" style="position:fixed;top:10px;left:30px;border-radius: 5px;font-size: 12px;font-weight: bold;padding: 4px 4px;background: gold;color: #FFF;min-width: 60px;text-align: center;line-height: normal;text-decoration: none;z-index: 10000;">Loading...</div>');
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