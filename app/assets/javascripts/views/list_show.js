TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.cards(), 'remove', this.render);
		this.listenTo(this.model.cards(), 'add', this.addCard);

		this.model.cards().each(this.addCard.bind(this));
	},

	addCard: function (card) {
		newCard = new TrelloClone.Views.CardShow({ model: card });
		this.addSubview(".cards", newCard);
	},

	render: function () {
		var renderedContent = this.template({ list: this.model });
		this.$el.html(renderedContent);
		this.attachSubviews();

		// var newListForm = new TrelloClone.Views.CardNew({ 
		// 	collection: this.model.cards() 
		// });
		// this.$el.append(newCardForm.render().$el);

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
		console.log('close card form');
		this.$('.card-footer').html('<div class="add-card">Add Card ...</div>');
	},

	highlightAddCard: function(event) {
		$(event.currentTarget).toggleClass('highlight-add');		
	},

	unHighlightAddCard: function(event) {
		$(event.currentTarget).removeClass('highlight-add');		
	},

	showAddCardForm: function(event) {
		var newCard = new TrelloClone.Views.CardNew({ collection: this.model.cards() });
		this.$('.card-footer').html(newCard.render().$el);
	},

	highlightCard: function(event) {
		$(event.currentTarget).addClass('highlight');
	},

	unHighlightCard: function(event) {
		$(event.currentTarget).removeClass('highlight');
	},

	startDragging: function(event) {
		$(event.currentTarget).addClass('dragging');
	},

	stopDragging: function(event) {
		$(event.currentTarget).removeClass('dragging');
	}
})