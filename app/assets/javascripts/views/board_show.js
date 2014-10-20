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
		this._sortableCards();
		this._sortableLists();

		return this;
	},

	_sortableCards: function () {
		var $sortables = this.$('.cards.sortable');
		$sortables.sortable({
			connectWith: this.$('.cards.sortable'),

			update: function (event, ui) {
				var $list = $(event.target);
				var $cards = $list.find('.card');
				var listId = $list.data('listId');

				for (var i = 0; i < $cards.length; i++) {
					var cardId = $($cards[i]).data('cardId');
					$.ajax({
						url: 'api/cards/' + cardId,
						type: 'PUT',
						data: { card: { id: cardId, list_id: listId, ord: i } }
					})
				}
			}
		});
	},

	_sortableLists: function () {
		var $sortables = this.$('#lists.sortable')
		$sortables.sortable({
			connectWith: this.$('#lists.sortable'),

			update: function (event, ui) {
				var $lists = $(event.target).find('.list');

				for (var i = 0; i < $lists.length; i++) {
					var listId = $($lists[i]).data('listId');
					$.ajax({
						url: 'api/lists/' + listId,
						type: 'PUT',
						data: { list: { id: listId, ord: i } }
					})
				}
			}
		})
	}
})