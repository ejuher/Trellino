TrelloClone.Collections.BoardLists = Backbone.Collection.extend({
	model: TrelloClone.Models.List,

	url: function () {
		// will this work?? does this.board exist here???
		return this.board.url() + "/lists"
	},

	// what is the models variable? does it get used?
	// not currently being used. the board model calls this and passes in models 
	// as an empty array.
	initialize: function (models, options) {
		this.board = options.board;
	},

	comparator: function (list) {
		return list.get('ord');		
	}
})