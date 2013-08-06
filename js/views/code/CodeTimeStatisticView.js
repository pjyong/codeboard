define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    'text!templates/code/CodeTimeStatisticTemplate.html',
], function($, _, Backbone, dispatcher, CodeTimeStatisticTemplate){
    var codeTimeStatisticView = Backbone.View.extend({
        
        id: 'code_time_statistic',
        className: 'block',
        events: {
        },
        
        initialize: function(){
            this.model = this.options.model;
            _.bindAll(this, 'render');
            this.listenTo(this.model, 'change', this.render);
            // this.model.on('change', this.render, this);

            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(CodeTimeStatisticTemplate, _.extend(this.model.toJSON(), {isNew: this.model.isNew()}));
        
            this.$el.html(compiledTemplate);
            return this;
        },
    });
    return codeTimeStatisticView;
});