define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'collections/accessory/ConfigCollection',
    'collections/code/CodeCollection',
    'views/code/CodePreviewView',
], function($, _, Backbone, dispatcher, ConfigCollection, CodeCollection, CodePreviewView){
    // explode codeId string as an array

    var codeNewListView = Backbone.View.extend({

        id: 'code_new_list',

        events: {
          
        },

        initialize: function(){
            // 
            _.bindAll(this, 'addCodeView');
            var that = this;
            this.collection = new CodeCollection();
            // console.log(this.collection);
            // get local codes
            this.websiteConfig = new ConfigCollection();
            this.websiteConfig.fetch({
                success: function(collection){
                    var codes = collection.fetchLocalCodes(that.collection);
                    that.collection.add(codes);
                }
            });
            // this.codeTimeStatisticModel = this.options.codeTimeStatisticModel;

            // when submit new code, it will goes the list view
            dispatcher.on('view:addonecode', this.addCodeView);


            this.render();
        },

        render: function(){
            var that = this;
            this.collection.each(function(model){
                var code = new CodePreviewView({model: model})
                that.$el.prepend(code.$el);
                // that.addCodeView(model);
            });
            
            

            return this;
        },

        addCodeView: function(model){
            
            this.collection.add(model);
            // add new codeId into localstorage
            this.websiteConfig.addNewCode(model);
            // plus one for statictis
            // this.codeTimeStatisticModel.addOne();

            // make some effect
            var newDiv = $('<div class="new_code_preview"></div>').hide();
            var code = new CodePreviewView({model: model});
            newDiv.html(code.$el);
            this.$el.prepend(newDiv);
            newDiv.fadeIn();
        },



    
    });

    return codeNewListView;
});