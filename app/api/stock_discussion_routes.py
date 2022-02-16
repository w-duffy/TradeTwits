from flask import Blueprint, request
# import requests
# import os
from app.models import db, StockDiscussion, Comment, Like
from datetime import datetime

stock_discussion_routes = Blueprint("discussion", __name__)

@stock_discussion_routes.route("/<string:ticker>")
def get_portfolio_stats(ticker):
    discussion = StockDiscussion.query.filter(StockDiscussion.ticker == ticker).all()
    return(discussion[0].to_dict())

@stock_discussion_routes.route('/new/comment', methods=['POST'])
# @login_required
def new_comment():
    object = request.json
    comment = object['comment']
    user_id = object['user_id']
    stock_discussion_id = object['stock_discussion_id']
    today = datetime.now()
    new_comment = Comment(user_id=user_id, comment=comment, stock_discussion_id=stock_discussion_id, time_created=today, time_updated=today)
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()

@stock_discussion_routes.route("/delete/<int:id>", methods=['DELETE'])
# @login_required
def deletePortfolioTicker(id):
    print("ID IN API", id)
    comment_to_delete = Comment.query.filter(Comment.id == id).all()
    print("TICKER IN API TO DEL", comment_to_delete[0])
    likes_to_delete = Like.query.filter(Like.comment_id == id).all()
    for like in likes_to_delete:
        print("LIKE IN API", like)
        db.session.delete(like)
    delete_object = comment_to_delete[0]
    print(delete_object.to_dict())
    db.session.delete(delete_object)
    db.session.commit()
    return delete_object.to_dict()
