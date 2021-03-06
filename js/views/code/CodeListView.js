define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'collections/code/CodeCollection',
    'text!templates/code/CodePreviewTemplate.html',
    'views/accessory/LoadingDivView',
    'views/code/CodePreviewView',
], function($, _, Backbone, dispatcher, CodeCollection, CodePreviewTemplate, LoadingDivView, CodePreviewView){
    var codeListView = Backbone.View.extend({

        _childViews: {},

        id: 'code_list_body',

        events: {
        },

        initialize: function(){
            this.isLoading = false;

            _.bindAll(this, "render", 'loadCodes', 'loadCodesByScroll', 'updateListCodes', 'addOne');
            // get date
            var tempO = {};
            if(!_.isUndefined(this.options.month)){
                tempO = {date: this.options.year + '-' + this.options.month};   
            }else if(!_.isUndefined(this.options.searchMethod)){
                tempO = {searchMethod: this.options.searchMethod, searchKeyword: this.options.searchKeyword};
            }
            this.collection = new CodeCollection(tempO);

            this.dispatcher = dispatcher;

            // when scroll the bottom of page
            dispatcher.on('view:loadmorecodes', this.loadCodesByScroll);
            // when clicking the date button
            dispatcher.on('view:updatelistcodes', this.updateListCodes);

            this._childViews.loadingDiv = new LoadingDivView();

            this.render();
        },

        render: function(){

            this.$el.append(this._childViews.loadingDiv.$el);

            this.loadCodes();

            return this;
        },

        loadCodes: function(options){
            var that = this;
            var local = {
                success: function(collection, codes, options){
                    // if all codes are synced to client from server
                    if(0 === codes.length){
                        // that._childViews.loadingDiv.$el.show().html('No more codes!');
                        // setTimeout(function(){
                        //     that._childViews.loadingDiv.$el.fadeOut();
                        // }, 3000);
                        $.gritter.add({
                            // (string | mandatory) the heading of the notification
                            title: '',
                            image: '/images/start_here_64.png',
                            class_name: 'codeboard-info',
                            // (string | mandatory) the text inside the notification
                            text: '<strong>Master of hands</strong> No more codes.',
                            // class_name: 'gritter-success'
                        });
                        // off the event
                        that.dispatcher.off('view:loadmorecodes');
                    }else{
                        collection.each(function(code){
                            that.addOne(code);
                        });
                    }                    
                    that._childViews.loadingDiv.$el.hide();
                    that.isLoading = false;
                }
            };



            _.extend(local, options);

            this.isLoading = true;
            this.$el.append(this._childViews.loadingDiv.$el);
            this._childViews.loadingDiv.$el.show();
            
            this.collection.fetch(local);

            return this;
        },

        loadCodesByScroll: function(){
            if(!this.isLoading){
                this.collection.page += 1;
                this.loadCodes({remove: true});
            }

            return this;
        },

        updateListCodes: function(options){

            if(!_.isUndefined(options.date) && options.date != this.collection.date){
                // re-fetch
                this.collection.parameter = options.date;
                this.collection.page = 0;
                this.collection.reset();
                this.dispatcher.on('view:loadmorecodes', this.loadCodesByScroll);

                // this.$('.code_preview').remove();
                this.loadCodes({remove: true});
            }

            return this;
        },

        // viewCode: function(e){
        //     e.preventDefault();
        //     var id = $(e.currentTarget).data("id");
        //     var code = this.collection.get(id);
        //     dispatcher.trigger('page:viewCode', code);

        //     return this;
        // },

        addOne: function(model){
            var codePreviewView = new CodePreviewView({model: model});
            this.$el.append(codePreviewView.$el);
        },

        remove: function(){
            // remove the event
            Backbone.View.prototype.remove.apply(this);
            dispatcher.off('view:loadmorecodes');
            dispatcher.off('view:updatelistcodes');
        }

        // undelegateEvents: function(){
        //     this.dispatcher.off('view:loadmorecodes');
        //     this.dispatcher.off('view:updatelistcodes');
        //     // call parent functions
        //     Backbone.View.prototype.undelegateEvents.apply(this);
        // },
    });

    return codeListView;
});