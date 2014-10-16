TrelloClone.Views.CardShow = Backbone.View.extend({
	template: JST['cards/show'],
	tagName: 'li',
	className: 'card',

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function () {
		var renderedContent = this.template({ card: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	
	events: {
		'mouseenter .card-title'       : 'showX',
		'mouseleave .card-title'       : 'hideX',
		'click      .glyphicon-remove' : 'deleteList'
	},

	showX: function(event) {
		var $closeIcon = $(event.currentTarget).find('.glyphicon-remove');
		$closeIcon.hide();
		$closeIcon.removeClass('hidden');
		$closeIcon.show(200);
	},

	hideX: function(event) {
		var $closeIcon = $(event.currentTarget).find('.glyphicon-remove');
		$closeIcon.hide(200, function() {
			$closeIcon.find('.glyphicon-remove').addClass('hidden');
		})
	},

	deleteList: function(event) {
		this.model.destroy();
		view = this;
		this.$el.hide(200, function() {
			view.remove();
		});
	}
})