TrelloClone.Routers.TrelloCloneRouter = Backbone.Router.extend({
	routes: {
		// 'api/boards': 'index'
		// why is this wrong? it's the route listed for the boards#index 
		// when you rake routes
		'': 'index'
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	index: function () {
		// create new view, put it on the page
		var newIndex = new TrelloClone.Views.BoardIndex({
			collection: TrelloClone.boards
		});
		this.$rootEl.append(newIndex.render().$el);
	}
})