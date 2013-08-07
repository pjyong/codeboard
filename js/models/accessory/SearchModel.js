define([
	'jquery',
	'underscore',
	'backbone',
    'localStorage',
], function($, _, Backbone, localStorage){
	var searchModel = Backbone.Model.extend({

    	defaults: {
            searchType: '',
            searchKeywords: ''
        },

        initialize: function(){
            
        },

        url: function(){
            return '/search/' + this.get('searchType') + '/' + this.get('searchKeywords');
        },

	});

	return searchModel;
});