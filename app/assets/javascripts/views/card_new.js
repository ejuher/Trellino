TrelloClone.Views.CardNew = Backbone.View.extend({
	template: JST['cards/new'],
	tagName: 'form',
	attributes: { 'role': 'form' },

	events: {
		"submit form": "createCard"
	},

	createCard: function (event) {
		event.preventDefault();
		debugger
		var formJSON = $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.Card(formJSON.card);

		newList.set('list_id', this.list.id);
		
		newList.save({}, {
			success: function () {
				this.list.cards().add(newList);
				// this.$el.find('#list-title').val('');
			}.bind(this)
		});
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})