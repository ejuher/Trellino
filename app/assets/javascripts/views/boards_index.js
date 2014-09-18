TrelloClone.Views.BoardIndex = Backbone.View.extend({
	template: JST['boards/index'], // this does not work.
	tagName: 'ul',

	initialize: function () {
		// listen for a collections to sync, then render
		this.listenTo(this.collection, 'sync', this.render)
	},

	render: function () {
		debugger
		var renderedContent = this.template({ boards: this.collection });
		this.$el.html(renderedContent); 
		return this;
	}
})