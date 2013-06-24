define([
	'jquery',
	'underscore',
	'backbone',
	'localStorage',
	'models/code/CodeModel',
], function($, _, Backbone, LocalStorage, CodeModel){

	var codeCollection = Backbone.Collection.extend({
		model: CodeModel,
		// localStorage: new LocalStorage("codes"),
        // url: domain + 'codes',
        url: function(){
        	return '/codes/' + this.date + '/' + this.page;
        },

        initialize: function(options){
            // 
            options || (options = {});

            // init the date
            if(_.isUndefined(options.date)){
                // get current date
                var date = new Date();
                this.date = date.getFullYear() + '-' + (date.getMonth() + 1);
            }else{
                this.date = options.date;
            }

            // init the page 
            this.page = options.page || 0;
        },
	});

	return codeCollection;
});