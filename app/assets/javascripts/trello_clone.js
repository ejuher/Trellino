window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  // TrelloClone.boards = 
  initialize: function() {
  	new TrelloClone.Routers.TrelloCloneRouter()
  	Backbone.history.start();
  }
};
