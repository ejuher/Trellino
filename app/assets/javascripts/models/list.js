TrelloClone.Models.List = Backbone.Model.extend({
	urlRoot: 'api/lists',

	cards: function () {
		this._cards = this._cards || 
			new TrelloClone.Collections.ListCards([], { list: this })
		return this._cards;
	},

	parse: function (jsonResp) {
		if (jsonResp.cards) {
			this.cards.set(jsonResp.cards);
			delete jsonResp.cards;
		}
		return jsonResp;
	}
})