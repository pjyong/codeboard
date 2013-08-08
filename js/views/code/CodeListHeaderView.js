define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/code/CodeListHeaderTemplate.html',
], function($, _, Backbone, dispatcher, CodeListHeaderTemplate){
    var codeListHeaderView = Backbone.View.extend({
        
        // el : '#content',
        id: 'code_list_header',
        events: {
        },
        
        initialize: function(){
            this.render();
        },
        render: function(){

            var compiledTemplate = _.template(CodeListHeaderTemplate, {});
            this.$el.html(compiledTemplate);
            var optionsDiv = this.$el.find('#search_info');
            var searchMethodInput = this.$el.find('#searchMethod');
            var byCode = this.$el.find('.bycode');
            var byWord = this.$el.find('.byword');
            this.$el.find('.search_options').click(function(){
                optionsDiv.toggle();
            });
            byCode.click(function(){
                // 
                searchMethodInput.val(1);
                $(this).find('.icon-ok').show();
                byWord.find('.icon-ok').hide();
            });
            byWord.click(function(){
                // 
                searchMethodInput.val(0);
                $(this).find('.icon-ok').show();
                byCode.find('.icon-ok').hide();
            });
            optionsDiv.find('.btn').hover(function(){
                $(this).find('.icon-ok').show();
                $(this).siblings().find('.icon-ok').hide();
            }, function(){
                // 
                if(searchMethodInput.val() === '1'){
                    byCode.find('.icon-ok').show();
                    byWord.find('.icon-ok').hide();
                }else{
                    byWord.find('.icon-ok').show();
                    byCode.find('.icon-ok').hide();
                }
            });
            return this;
        },
    });
    return codeListHeaderView;
});