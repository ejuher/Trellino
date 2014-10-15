TrelloClone.Views.CardShow = Backbone.View.extend({
	template: JST['cards/show'],

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function () {
		var renderedContent = this.template({ card: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	
	events: {
		'mouseover .card-title'       : 'showX',
		'mouseout  .card-title'       : 'hideX',
		'click     .glyphicon-remove' : 'deleteList'
	},

	showX: function(event) {
		$(event.currentTarget).find('.glyphicon-remove').removeClass('hidden');
	},

	hideX: function(event) {
		$(event.currentTarget).find('.glyphicon-remove').addClass('hidden');
	},

	deleteList: function(event) {
		this.model.destroy();
		view = this;
		this.$el.hide(200, function() {
			view.remove();
		});
	}
})