TrelloClone.Collections.Boards = Backbone.Collection.extend({
	model: TrelloClone.Models.Board,
	url: 'api/boards',

	getOrFetch: function (id) {
		var boards = this;
		var board = boards.get(id);
		if (board) {
			board.fetch();
		} else {
			board = new TrelloClone.Models.Board({ id: id });
			board.fetch({
				success: function () { 
					console.log('here');
					boards.add(board); 
				}
			});
		}
		return board;
	}
})