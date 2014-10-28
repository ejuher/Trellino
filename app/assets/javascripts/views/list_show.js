TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],
	className: 'list list-item',

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.cards(), 'remove', this.render);
		this.listenTo(this.model.cards(), 'add', this.addCard);

		this.model.cards().each(this.addCard.bind(this));

		this.$el.attr('data-list-id', this.model.get('id'));
	},

	addCard: function (card) {
		newCard = new TrelloClone.Views.CardShow({ model: card });
		this.addSubview(".cards", newCard);
	},

	render: function () {
		var renderedContent = this.template({ list: this.model });
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},

	events: {
		'mouseenter .add-card'				 : 'highlightAddCard',
		'mouseleave .add-card'				 : 'unHighlightAddCard',
		'click      .add-card'         : 'showAddCardForm',
		'mouseenter .card'             : 'highlightCard',
		'mouseleave .card' 						 : 'unHighlightCard',
		'mousedown  .card'						 : 'startDragging',
		'mouseup    .card'						 : 'stopDragging',
		'click      .new-card-close'   : 'closeCardForm',
	},

	closeCardForm: function(event) {
		this.$('.card-footer').html('<div class="add-card">Add Card ...</div>');
	},

	highlightAddCard: function(event) {
		$(event.currentTarget).toggleClass('highlight-add');		
	},

	unHighlightAddCard: function(event) {
		$(event.currentTarget).removeClass('highlight-add');		
	},

	showAddCardForm: function(event) {
		var newCard = new TrelloClone.Views.CardNew({ collection: this.model.cards(), model: this.model });
		this.$('.card-footer').html(newCard.render().$el);
	},

	highlightCard: function(event) {
		$(event.currentTarget).addClass('highlight');
	},

	unHighlightCard: function(event) {
		$(event.currentTarget).removeClass('highlight');
	},

	startDragging: function(event) {
		if (event.which === 1) {
			$(event.currentTarget).addClass('dragging');
		}
	},

	stopDragging: function(event) {
		$(event.currentTarget).removeClass('dragging');
	}
})