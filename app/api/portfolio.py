from flask import Blueprint, jsonify
import requests
import os
import pandas as pd
from app.models import db, Portfolio

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route("/<int:id>")
def get_portfolio_stats(id):
    details = Portfolio.query.filter(Portfolio.user_id == id).all()
    all_details = []
    for portfolio in details:
        portfolio = portfolio.to_dict()
        portfolio_detail = {}
        ticker = portfolio['ticker']
        url = "https://alpha-vantage.p.rapidapi.com/query"

        querystring = {"function":"TIME_SERIES_DAILY","symbol": ticker.upper(),"outputsize":"compact","datatype":"json"}

        headers = {
        'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        object = response.json()

        values_to_destructure = object["Time Series (Daily)"]

        #Creates an array of all the dates
        dates = []
        for key in values_to_destructure:
            dates.append(key)

        #creates an array of all the historical prices
        values = []
        panda_data = pd.DataFrame(values_to_destructure)
        panda_data_t = panda_data.T
        for index, row in panda_data_t.iterrows():
            values.append(row["4. close"])

        portfolio_detail['ticker'] = ticker
        portfolio_detail["dates"] = dates
        portfolio_detail["values"] = values

        all_details.append(portfolio_detail)
  
    info = {}
    info['info'] = all_details
    print("INFOOOOOOOO", info)
    return(info)

    # print("DETAILSSS", details)
