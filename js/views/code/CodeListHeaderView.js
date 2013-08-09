define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/code/CodeListHeaderTemplate.html',
    'models/accessory/SearchModel'
], function($, _, Backbone, dispatcher, CodeListHeaderTemplate, SearchModel){
    var codeListHeaderView = Backbone.View.extend({
        
        // el : '#content',
        id: 'code_list_header',
        events: {
            'click .submitSearch': 'startSearch'
        },
        
        initialize: function(){
            _.bindAll(this, 'startSearch');
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

        startSearch: function(){
            var searchMethod = (this.$el.find('#searchMethod').val() == '1') ? 'keycode' : 'keyword';
            var txt = this.$el.find('#query').val();
            var searchModel = new SearchModel({searchType: searchMethod, searchKeywords: txt});
            searchModel.fetch({
                success: function(model, response, options){
                    // 
                    
                }
            });
        }
    });
    return codeListHeaderView;
});