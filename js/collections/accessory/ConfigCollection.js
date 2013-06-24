define([
	'jquery',
	'underscore',
	'backbone',
    'localStorage',
	'models/accessory/ConfigModel',
    'models/code/CodeModel',
], function($, _, Backbone, localStorage, ConfigModel, CodeModel){
	var configCollection = Backbone.Collection.extend({

		model: ConfigModel,

        localStorage: new Backbone.LocalStorage("codeboard-config"),

        updateConfig: function(option, value){
            // first lookup the model
            var target = this.findWhere({option:option});
            if(!_.isEmpty(target)){
                // update the model
                target.save({value: value});
            }else{
                this.create({option:option,value:value});
            }
            
        },

        fetchLocalCodes: function(){
            var codes = [];
            var target = this.findWhere({option:'localCodes'});
            if(!_.isUndefined(target)){
                var codeStr = target.get('value');
                // explode
                var codeArray = codeStr.split(',');
                codeArray = _.sortBy(codeArray, function(id){return id;});
                _.each(codeArray, function(id){
                    var codeModel = new CodeModel({id: id});
                    codes.push(codeModel);
                    codeModel.fetch();
                });
            }
            return codes;
        },

        fetchLocalTheme: function(){
            var theme = 'default';
            var target = this.findWhere({option:'editorTheme'});
            if(!_.isUndefined(target)){
                theme = target.get('value');
            }
            return theme;
        },

        addNewCode: function(model){
            var target = this.findWhere({option:'localCodes'});
            if(!_.isUndefined(target)){
                // exist
                var codeStr = target.get('value');
                codeStr += ',' + model.get('id');
                target.save({value: codeStr});
            }else{
                // new
                this.create({option:'localCodes', value: model.get('id')});
            }

        },
    });

	return configCollection;
});