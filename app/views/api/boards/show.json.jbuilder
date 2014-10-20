# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.title @board.title
json.id @board.id
json.lists @board.lists do |list|
	json.(list, :id, :title, :ord)
	json.cards list.cards.order(:ord)
end

