TrelloClone.Views.BoardIndex = Backbone.View.extend({
	template: JST['boards/index'],
	tagName: 'ul',

	initialize: function () {
		this.listenTo(this.collection, 'sync add destroy', this.render)
	},

	events: {
		'submit    form'                   : 'createBoard',
		'click     a .glyphicon-remove'    : 'deleteBoard',
		'click     .add'                   : 'showForm',
		'click     form .glyphicon-remove' : 'closeForm'
	},

	createBoard: function (event) {
		event.preventDefault();
		var formJSON = $(event.currentTarget).serializeJSON();
		var newBoard = new TrelloClone.Models.Board(formJSON);
		newBoard.save({}, {
			success: function () {
				this.collection.add(newBoard);
			}.bind(this)
		});
	},

	deleteBoard: function (event) {
		event.preventDefault();
		var boardId = $(event.currentTarget).data('boardId');
		var board = this.collection.getOrFetch(boardId);
		board.destroy();
	},

	showForm: function (event) {
		$divAdd = $(event.currentTarget)
		$divAdd.toggleClass('add');
		$divAdd.find('.add-text').toggle(function() {
			$divAdd.find('form').toggle(400);
		});
	},

	closeForm: function (event) {
		$(event.currentTarget.parentElement.parentElement).toggleClass('add');
		this.$el.find('form').toggle(400, function() {
			this.$el.find('.add-text').toggle(400);
		}.bind(this))
	},

	render: function () {
		var renderedContent = this.template({ boards: this.collection });
		this.$el.html(renderedContent); 
		return this;
	}
})