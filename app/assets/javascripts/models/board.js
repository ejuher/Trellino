TrelloClone.Models.Board = Backbone.Model.extend({
	urlRoot: 'api/boards/',

	parse: function (jsonResp) {
		debugger
		if (jsonResp.lists) {
			this.lists().set(jsonResp.lists);
			delete jsonResp.lists;
		}
		return jsonResp;
	},

	lists: function () {
		this._lists = this._lists || 
			new TrelloClone.Collections.BoardLists([], { board: this });
		return this._lists
	}
})