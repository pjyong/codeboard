define([
	'jquery',
	'underscore',
	'backbone',
    'localStorage',
], function($, _, Backbone, localStorage){
	var configModel = Backbone.Model.extend({

    	defaults: {
            option: '',
            value: ''
        },

        initialize: function(){
            
        },
	});

	return configModel;
});