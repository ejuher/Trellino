TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.cards(), 'remove', this.render);
		this.listenTo(this.model.cards(), 'add', this.addCard);

		this.model.cards().each(this.addCard.bind(this));
	},

	addCard: function (card) {
		newCard = new TrelloClone.Views.CardShow({ model: card });
		this.addSubview(".cards", newCard);
	},

	render: function () {
		var renderedContent = this.template({ list: this.model });
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},

	events: {
		'mouseenter .card'             : 'highlightCard',
		'mouseleave .card' 						 : 'unHighlightCard',
		'mousedown  .card'						 : 'startDragging',
		'mouseup    .card'						 : 'stopDragging',
	},

	highlightCard: function(event) {
		$(event.currentTarget).addClass('highlight');
	},

	unHighlightCard: function(event) {
		$(event.currentTarget).removeClass('highlight');
	},

	startDragging: function(event) {
		$(event.currentTarget).addClass('dragging');
	},

	stopDragging: function(event) {
		$(event.currentTarget).removeClass('dragging');
	}
})