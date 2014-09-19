TrelloClone.Collections.BoardLists = Backbone.Collection.extend({
	model: TrelloClone.Models.List,

	url: function () {
		// OH NO! ON RAILS THE LISTS ARE NOT NESTED IN THE BOARDS SO THIS WILL
		// NOT WORK!!!1 FUCKKKKK. Do I need to rewrite the routes? What lists do 
		// I want here anyways? 
		return this.board.url() + "/lists"
	},

	// what is the models variable? does it get used?
	// not currently being used. the board model calls this and passes in models 
	// as an empty array.
	initialize: function (models, options) {
		this.board = options.board
	}
})