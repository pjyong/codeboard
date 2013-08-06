define([
	'jquery',
	'underscore',
	'backbone',
    'router/dispatcherEvent'
], function($, _, Backbone, dispatcher){

    function getMonthLabel(month){
        if(1 === month){
            return 'Jan';
        }else if(2 === month){
            return 'Feb';
        }else if(3 === month){
            return 'Mar';
        }else if(4 === month){
            return 'Apr';
        }else if(5 === month){
            return 'May';
        }else if(6 === month){
            return 'Jun';
        }else if(7 === month){
            return 'Jul';
        }else if(8 === month){
            return 'Aug';
        }else if(9 === month){
            return 'Sep';
        }else if(10 === month){
            return 'Oct';
        }else if(11 === month){
            return 'Nov';
        }else{
            return 'Dec';
        }
    }

	var dateButtonModel = Backbone.Model.extend({

    	defaults: {
            year: '',
            month: '',
            label: '',
            status: true,
            current: false,
        },

        initialize: function(){
            
            // set the label
            var label = '';
            if('' === this.get('month')){
                label = this.get('year');
            }else{
                label = getMonthLabel(parseInt(this.get('month')));
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