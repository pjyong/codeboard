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
        	return '/codes/' + this.parameter + '/' + this.page;
        },

        initialize: function(options){
            // 
            options || (options = {});

            // init
            if(_.isUndefined(options.date) && _.isUndefined(options.searchMethod)){
                // get current date
                var date = new Date();
                this.parameter = date.getFullYear() + '-' + (date.getMonth() + 1);
            }else if(!_.isUndefined(options.date)){
                this.parameter = options.date;
            }else if(!_.isUndefined(options.searchMethod)){
                this.parameter = options.searchMethod + '/' + options.searchKeyword;
            }else{
                this.parameter = '';
            }

            // init the page 
            this.page = options.page || 0;
        },
	});

	return codeCollection;
});