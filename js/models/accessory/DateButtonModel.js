define([
	'jquery',
	'underscore',
	'backbone',
    'router/dispatcherEvent'
], function($, _, Backbone, dispatcher){
	var dateButtonModel = Backbone.Model.extend({

    	defaults: {
            year: '',
            month: '',
            label: '',
            status: true,
            current: false
        },

        initialize: function(){
            
            // set the label
            var label = '';
            if('' === this.get('month')){
                label = this.get('year');
            }else{
                label = this.get('month');
            }
            this.set({label: label});

            // set the url
            // var url = '';
            // url = '#/' + this.get('year');
            // if('' !== this.get('month')){
            //     url = url + '/' + this.get('month');
            // }
            // this.set({url: url});
        },

        toggleCurrent: function(){
            // becaue the model doesn't need be persisted into database
            // so I didn't use save(), if I use save(), it will give me error
            this.set({current: true});


            dispatcher.trigger("datebuttoncollection:update", this);
            
            // var url = '';
            // url = '' + this.get('year');
            // if('' !== this.get('month')){
            //     url = url + '/' + this.get('month');
            // }
            // dispatcher.trigger("codecollection:update", );
            // trigger the change event
            // this.trigger('change:current');
            // this.save({current: !this.get('current')});
            // alert(this.get('current'));
        }
	});

	return dateButtonModel;
});