define([
    'models/code/LanguageModel',
], function(LanguageModel){

    var languageCollection = Backbone.Collection.extend({
        model: LanguageModel,
        // localStorage: new LocalStorage("codes"),
        url: '/languages',
    });

    return languageCollection;
});