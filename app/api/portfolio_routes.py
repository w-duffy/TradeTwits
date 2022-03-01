from flask import Blueprint, jsonify, request
import requests
import os
import pandas as pd
from app.models import db, Portfolio, User

portfolio_routes = Blueprint("portfolio", __name__)


@portfolio_routes.route('/new/ticker', methods=['POST'])
# @login_required
def new_ticker():
    object = request.json
    ticker = object['ticker']
    user_id = object['user_id']
    newPortfolio = Portfolio(ticker=ticker, user_id=user_id)

    db.session.add(newPortfolio)
    db.session.commit()
    user = User.query.get(user_id)
    return user.to_dict()


@portfolio_routes.route("/delete/<string:ticker>", methods=['DELETE'])
# @login_required
def deletePortfolioTicker(ticker):
    object = request.json
    id = object['id']
    ticker_to_delete = Portfolio.query.filter(Portfolio.ticker == ticker and Portfolio.user_id == id).all()
    delete_object = ticker_to_delete[0]
    db.session.delete(delete_object)
    db.session.commit()
    user = User.query.get(id)
    return user.to_dict()
