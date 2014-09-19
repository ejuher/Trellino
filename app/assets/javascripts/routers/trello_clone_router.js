TrelloClone.Routers.TrelloCloneRouter = Backbone.Router.extend({
	routes: {
		// 'api/boards': 'index'
		// why is this wrong? it's the route listed for the boards#index 
		// api/boards is the route to get info from the server but not the 
		// route the client will visit. 
		// do we just have to memorize the conventions for urls the user 
		// will visit in a RESTful envirnoment?
		'': 'index',
		'boards/:id': 'show',
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	index: function () {
		// create new view, put it on the page
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
		// if (this.currentView) {
		// 	this.currentView.remove();
		// }
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().$el);
	}
})