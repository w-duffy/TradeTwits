from flask import Blueprint, request
# import requests
# import os
from app.models import db, StockDiscussion, Comment
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
