TrelloClone.Views.CardNew = Backbone.View.extend({
	template: JST['cards/new'],

	events: {
		"submit form": "createCard"
	},

	createCard: function (event) {
		event.preventDefault();
		var formJSON = $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.Card(formJSON.card);

		newList.set('list_id', this.model.id);
		
		newList.save({}, {
			success: function () {
				this.collection.add(newList);
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