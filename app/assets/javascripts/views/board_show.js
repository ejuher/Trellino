TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST['boards/show'],
	className: 'board-show',

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
		var renderedBoard = this.template({ board: this.model });
		this.$el.html(renderedBoard);	
		this.attachSubviews();	
		this.$('.sortable').sortable();
		var newListForm = new TrelloClone.Views.ListNew({ 
			collection: this.model.lists() 
		});
		this.$el.append(newListForm.render().$el);

		return this;
	},

	
})