TrelloClone.Views.BoardIndex = Backbone.View.extend({
	template: JST['boards/index'],
	tagName: 'ul',

	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render)
	},

	render: function () {
		var renderedContent = this.template({ boards: this.collection });
		this.$el.html(renderedContent); 
		return this;
	}
})