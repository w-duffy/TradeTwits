from flask import Blueprint, request
# import requests
# import os
from app.models import db, StockDiscussion, Comment, Like, Reply
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
    comment_to_delete = Comment.query.filter(Comment.id == id).all()
    likes_to_delete = Like.query.filter(Like.comment_id == id).all()
    replies_to_delete = Reply.query.filter(Reply.comment_id == id).all()
    for reply in replies_to_delete:
        reply_likes = Like.query.filter(Like.reply_id == reply.id).all()
        for l in reply_likes:
            db.session.delete(l)
        db.session.delete(reply)
    for like in likes_to_delete:
        db.session.delete(like)
    delete_object = comment_to_delete[0]
    print(delete_object.to_dict())
    db.session.delete(delete_object)
    db.session.commit()
    return delete_object.to_dict()

@stock_discussion_routes.route("/edit/<int:id>", methods=['PUT'])
# @login_required
def edit_discussion_comment(id):
    object = request.json
    new_comment = object['newComment']
    today = datetime.now()
    comment_to_edit = Comment.query.get(id)
    comment_to_edit.comment = new_comment
    comment_to_edit.time_updated = today
    db.session.add(comment_to_edit)
    db.session.commit()
    return comment_to_edit.to_dict()

