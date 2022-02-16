from flask import Blueprint, jsonify, request
import requests
import os
from app.models import db, StockDiscussion

stock_discussion_routes = Blueprint("discussion", __name__)

@stock_discussion_routes.route("/<string:ticker>")
def get_portfolio_stats(ticker):
    # print("TICKER1", ticker)
    discussion = StockDiscussion.query.filter(StockDiscussion.ticker == ticker).all()
    print("DISCUSSION", discussion[0])
    return(discussion[0].to_dict())
