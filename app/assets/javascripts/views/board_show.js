TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST['boards/show'],

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.lists(), 'add', this.addList);

		this.model.lists().each(this.addList.bind(this));
	},

	addList: function (list) {
		newList = new TrelloClone.Views.ListShow({ model: list });
		this.addSubview("#lists", newList);
	},

	render: function () {
		// error because the boards lists are not being fetched
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);	
		this.attachSubviews();	
		return this;
	}
})