TrelloClone.Views.BoardIndex = Backbone.View.extend({
	template: JST['boards/index'],
	tagName: 'ul',

	initialize: function () {
		this.listenTo(this.collection, 'sync add destroy', this.render)
	},

	events: {
		'submit form.new-list': 'createBoard',
		'click button.delete-board': 'deleteBoard'
	},

	createBoard: function (event) {
		event.preventDefault();
		var formJSON = $(event.currentTarget).serializeJSON();
		var newBoard = new TrelloClone.Models.Board(formJSON);
		newBoard.save({}, {
			success: function () {
				// this.collection.add(newBoard);
				Backbone.history.navigate("boards/" + newBoard.id, { trigger: true });
			}.bind(this)
		});
	},

	deleteBoard: function (event) {
		var boardId = $(event.currentTarget).data('boardId');
		var board = this.collection.getOrFetch(boardId);
		board.destroy();
	},

	render: function () {
		var renderedContent = this.template({ boards: this.collection });
		this.$el.html(renderedContent); 
		return this;
	}

	// button for new board
	// event for clicking on the button
	// when button is clicked on, render a form
	// event listening for form submit
	// on form submit, create the board in the database and re-render
})