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
		this._sortable();

		return this;
	},

	_sortable: function () {
		var $sortables = this.$('.sortable');
		$sortables.sortable({
			connectWith: this.$('.sortable'),
			// upon update, find out what your order is and update
			// find out what list you're on, then update
				// to do this, will hhave to imbed list id into its div
			update: function (event, ui) {
				// var data = $(this).sortable('serialize');
				debugger

				var $list = $(event.target);
				var $cards = $list.find('.card');
				var listId = $list.data('listId');
				for (var i = 0; i < $cards.length; i++) {
					// make an update request to card
					var data = { list_id: listId, ord: i }

					$.ajax({
						url: ""
					})
				}
				// target is the list div
				// i want to iterate through all cards on this list and reset the ord
				// properties in the db to match the state on this list
					// how do I access the card models? 
					// place card id in data attribute
				// 
			}
		});
	}
})