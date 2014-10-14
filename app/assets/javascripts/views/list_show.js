TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
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
	}
})