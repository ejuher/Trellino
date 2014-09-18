TrelloClone.Views.BoardIndex = Backbone.View.extend({
	template: JST['board/index'],

	render: function () {
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})