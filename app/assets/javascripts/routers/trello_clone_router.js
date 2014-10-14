TrelloClone.Routers.TrelloCloneRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'boards/:id': 'show',
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	index: function () {
		var newIndex = new TrelloClone.Views.BoardIndex({
			collection: TrelloClone.boards
		});
		this._swapViews(newIndex);
	},

	show: function (id) {
		var showBoard = TrelloClone.boards.getOrFetch(id);
		var newShow = new TrelloClone.Views.BoardShow({
			model: showBoard
		});
		this._swapViews(newShow);
	},

	_swapViews: function (view) {
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().$el);
	}
})