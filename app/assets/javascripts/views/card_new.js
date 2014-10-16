TrelloClone.Views.CardNew = Backbone.View.extend({
	template: JST['lists/new'],

	events: {
		"submit form": "createCard"
	},

	createCard: function (event) {
		event.preventDefault();

		var formJSON = $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.Card(formJSON.card);

		newList.set('board_id', this.collection.board.id);
		
		newList.save({}, {
			success: function () {
				this.collection.add(newList);
				this.$el.find('#list-title').val('');
			}.bind(this)
		});
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})