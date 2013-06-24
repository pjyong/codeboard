define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){
	var appView = Backbone.View.extend({
		el: 'body',

		events: {
			'click #cb_code_status': 'togglePrivate',
		},

		attributes: {
			'signOfPrivate': 0,
		},

		render: function(){
		},

		togglePrivate: function(){
			if(this.$el.attr('signOfPrivate') == 0){
				this.$el.find('[for=cb_code_status]').html('hahahaha');
				this.$el.attr('signOfPrivate', 1);
			}else{
				this.$el.find('[for=cb_code_status]').html('aaaaaaaaaaaaa');
				this.$el.attr('signOfPrivate', 0);

			}
		},
	});

	return appView;
});