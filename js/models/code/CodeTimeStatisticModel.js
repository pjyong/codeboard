define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var codeTimeStatisticModel = Backbone.Model.extend({
        defaults: {
            today: 0,
            week: 0,
            month: 0,
            year: 0
        },

        url: function(){
            return '/statistic';
        },

        addOne: function(){
            this.set({today: parseInt(this.get('today')) + 1, week: parseInt(this.get('week')) + 1, month: parseInt(this.get('month')) + 1, year: parseInt(this.get('year')) + 1});
        },

    });

    return codeTimeStatisticModel;
});