define([
    'models/accessory/DateButtonModel',
    'text!templates/accessory/DateButtonTemplate.html',
    'router/dispatcherEvent',
    'router/routerApp',
], function(DateButtonModel, DateButtonTemplate, dispatcher, Router){

    var dateButtonView = Backbone.View.extend({

        tagName: 'span',

        className: 'button_view',

        events: {
            'click a': 'toggleCurrent',
        },
        
        initialize: function(){
            this.model = this.options.model;
            // add listener
            this.listenTo(this.model, 'change:current', this.render);
            this.render();
        },

        render: function(){
            this.$el.toggleClass('current_button_view', this.model.get('current'));
            var compiledTemplate = _.template(DateButtonTemplate, this.model.toJSON());
            this.$el.html(compiledTemplate);

            return this;
        },

        // change the property of model
        toggleCurrent: function(e){
            e.preventDefault();
            if(!$(e.currentTarget).hasClass('disabled')){
                this.model.toggleCurrent();

                var y = this.model.get('year');
                // trigger the list code view update
                // pass Date Paramter
                var m = this.model.collection.getHighlightDate(this.model);
                // console.log(m.get('year') + '-' + m.get('month'));
                dispatcher.trigger('view:updatelistcodes', {date: m.get('year') + '-' + m.get('month')})

                var router = new Router();
                router.navigate('#/' + y + '/' + m.get('month'));
                return this;
            }
            return;
        },
    });
 
    return dateButtonView;
});