TrelloClone.Models.Board = Backbone.Model.extend({
	urlRoot: 'api/boards/',

	parse: function (jsonResp) {
		if (jsonResp.lists) {
			this.lists().set(jsonResp.lists);
			// how come I can't say this.lists = jsonResp.lists
			// or this._lists = jsonResp.lists ?
			// why do I have to assign with set?
			// the lists method ensures the lists collection is created if one
			// does not previously exist
			delete jsonResp.lists;
		}
		return jsonResp;
	},

	// populate these lists with data from the parse method which intercepts the payload
	lists: function () {
		this._lists = this._lists || 
			new TrelloClone.Collections.BoardLists([], { board: this });
		return this._lists
		// why pass in an empty array?
		// because passing options to a backbone collection can only be done as 
		// the second argument

		// how does this collection get populated?

		// WHY ARE THESE UNDERSCORED??
		// Is it to differentiate the instance variable from the method?
	}
})