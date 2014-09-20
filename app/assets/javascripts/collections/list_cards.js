TrelloClone.Collections.ListCards = Backbone.Collection.extend({
	url: 'api/cards',
	model: TrelloClone.Models.Cards,

	initialize: function (models, options) {
		this.list = options.list;
	},

	comparator: function (card) {
		return card.get('ord');		
	}
})