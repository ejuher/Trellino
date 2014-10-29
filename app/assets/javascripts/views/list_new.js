TrelloClone.Views.ListNew = Backbone.View.extend({
	template: JST['lists/new'],
	// tagName: 'form',
	// attributes: { 'role': 'form' },

	events: {
		"submit form": "createList"
	},

	createList: function (event) {
		event.preventDefault();
		debugger
		var formJSON = $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.List(formJSON.list);

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