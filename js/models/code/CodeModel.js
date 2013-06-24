define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){
	var codeModel = Backbone.Model.extend({
		defaults: {
			language: '',
			status: 0,
			fragment: ''
		},

        initialize: function(){
            // make sure the default value
            if(!this.get('status')){
                this.set({status: this.defaults.status});
            }

            if(!this.get('created')){
                var nowDate = new Date();
                var created = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate();
                created += ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds();
                this.set({created: created});
            }

            // this.on('request', function(){
            //     dispatcher.trigger('loading:start');
            // });
        },

        url: function(){
            return '/code/' + this.get('id');
        },

        sync: function(method, model, options){
            switch(method){
                case 'create':
                    options.url = '/code/add';
                    // options.success = function(id){model.set({id: id});};
                break;
                case 'read':break;
                case 'update':
                    options.url = '/code/update';
                break;
                case 'delete':break;

            }
            Backbone.sync.apply(this, arguments);
        },
	});

	return codeModel;
});