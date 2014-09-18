window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  // get $('#main') and pass it to the router

  initialize: function() {
  	TrelloClone.boards = new TrelloClone.Collections.Boards();
  	TrelloClone.boards.fetch();
  	var $content = $('#main');
  	new TrelloClone.Routers.TrelloCloneRouter({
  		$rootEl: $content
  	});

  	Backbone.history.start();
  }
};

$(document).ready(function () {
	TrelloClone.initialize();
})
