define([
	'jquery',
	'underscore',
	'backbone',
	'models/accessory/DateButtonModel',
    'router/dispatcherEvent',
], function($, _, Backbone, DateButtonModel, dispatcher){
	var datebuttonCollection = Backbone.Collection.extend({

		model: DateButtonModel,

        initialize: function(){
            _.bindAll(this, 'updateCurrent');
            // listen to own model change
            // if we use this solution: this.on("change:current", this.updateCurrent, this);
            // the updateCurrent will come with the default parameters for the model changed
            // but it will go into dead loop
            dispatcher.on('datebuttoncollection:update', this.updateCurrent);
        },

        updateCurrent: function(model){
            // set other models' current property false
            this.each(function(buttonModel){
                if('' === model.get('month')){
                    // year button
                    if(buttonModel.cid !== model.cid && true === buttonModel.get('current') 
                    && '' === buttonModel.get('month')){
                        // buttonModel.toggleCurrent();
                        // because this function is response to ToggleCurrent action
                        // I use the original way
                        buttonModel.set({current: false});
                    }
                }else{
                    // month button, clear other month buttons in the same year
                    if(buttonModel.cid !== model.cid && true === buttonModel.get('current') 
                    && buttonModel.get('year') === model.get('year') && '' !== buttonModel.get('month')){
                        // buttonModel.toggleCurrent();
                        // because this function is response to ToggleCurrent action
                        // I use the original way
                        buttonModel.set({current: false});
                    }
                }
            });

            



            // alert(2222);
            //update two models
            // this.set({current: false});
            
            // console.log(this.findWhere({year: parameters.year, month: parameters.month}));
            // this.findWhere({year: parameters.year, month: parameters.month}).set({current: true});
            // this.findWhere({year: parameters.year, month: ''}).set({current: true});
        },

        getAllYearButtons: function(){
            // console.log(this.where);
            return this.where({month: ''});
        },

        getHighlightDate: function(model){
            if('' === model.get('month')){
                var monthModel = this.filter(function(buttonModel){
                    if('' !== buttonModel.get('month') && model.get('year') === buttonModel.get('year') && true === buttonModel.get('current')){
                        return true;
                    }
                    return false;
                });
                return monthModel[0];
            }else{
                return model;
            }
        },

        getMonthsButtonsOfYear: function(year){
            // return _.filter(this.where({year: year}), function(buttonModel){
            //     if('' === buttonModel.get('month')){
            //         return false;
            //     }
            //     return true;
            // });
            return this.filter(function(buttonModel){
                if('' === buttonModel.get('month') || year !== buttonModel.get('year')){
                    return false;
                }
                return true;
            });
        }
	});

	return datebuttonCollection;
});