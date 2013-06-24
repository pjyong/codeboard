define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var languageModel = Backbone.Model.extend({
        defaults: {
            language: '',
            mode: '',
            order: 0,
        },
    });

    return languageModel;
});