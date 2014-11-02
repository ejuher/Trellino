TrelloClone.Views.CardNew = Backbone.View.extend({
	template: JST['cards/new'],

	events: {
		"submit form": "createCard"
	},

	createCard: function (event) {
		event.preventDefault();
		var formJSON = $(event.currentTarget).serializeJSON();
		var newCard = new TrelloClone.Models.Card(formJSON.card);

		newCard.set('list_id', this.model.id);
		
		newCard.save({}, {
			success: function () {
				this.collection.add(newCard);
				this.$('textarea').val('');
			}.bind(this)
		});
	},

	render: function () {
		var renderedContent = this.template({ list: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})