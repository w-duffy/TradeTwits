from .db import db
import os
import finnhub
from .portfolio import Portfolio
import requests
from datetime import datetime, timedelta


class StockDiscussion(db.Model):
    __tablename__ = "stockDiscussions"

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    comments = db.relationship("Comment", back_populates="stock_discussion")
    # user = db.relationship("User", back_populates="stock_discussion")
    # likes = db.relationship("Like", back_populates="stock_discussion")


    def to_dict(self):
        # #Code to pull the price for the ticker in the portfolio
        # portfolio_watchers = Portfolio.query.filter(Portfolio.ticker == self.ticker).all()

        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

            p = finnhub_client.quote(self.ticker.upper())
            data = finnhub_client.symbol_lookup(self.ticker.upper())
            company_name_upper = data['result'][0]['description']
            company_name_lower = company_name_upper.lower()
            company_name = company_name_lower.title()
            price = p["c"]
            percent_change = p['dp']

        except:
            try:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                price = p["c"]
                percent_change = p['dp']
            except:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                price = p["c"]
                percent_change = p['dp']
                company_stats = {}

        try:
            url = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile"

            querystring = {"symbol": self.ticker.upper(),"region":"US"}

            headers = {
                'x-rapidapi-host': "yh-finance.p.rapidapi.com",
                'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
                }

            response = requests.request("GET", url, headers=headers, params=querystring)

            object = response.json()
            try:
                volume = object["price"]["regularMarketVolume"]["fmt"]
            except:
                volume = "N/A"
            try:
                market_cap = object["price"]["marketCap"]["fmt"]
            except:
                market_cap = "N/A"
            try:
                fifty_week_high = object["summaryDetail"]["fiftyTwoWeekHigh"]["raw"]
                fifty_week_low = object["summaryDetail"]["fiftyTwoWeekLow"]["raw"]
            except:
                fifty_week_high = "N/A"
                fifty_week_low = "N/A"
        except:
            volume = "N/A"
            market_cap = "N/A"
            fifty_week_high = "N/A"
            fifty_week_low = "N/A"

        today = datetime.now()
        formatted_time = today.strftime("%B %d, %Y %I:%M%p")
        time_graph = today.strftime("%Y-%m-%d")
        # for comment in self.comments:
        #     comment.replies.sort(key=lambda r: r.time_created)
        week_ago = today - timedelta(days = 1)
        week_ago2 = today - timedelta(days = 30)
        news_time1 = today.strftime("%Y-%m-%d")
        news_time2 = week_ago.strftime("%Y-%m-%d")
        news_time3 = week_ago2.strftime("%Y-%m-%d")

        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

            company_news = (finnhub_client.company_news(self.ticker, _from=news_time2, to=news_time1))

        except:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))
            company_news = (finnhub_client.company_news(self.ticker, _from=news_time2, to=news_time1))



        return {
            "id": self.id,
            "name": company_name,
            "ticker": self.ticker,
            "comments": [comment.to_dict() for comment in self.comments],
            "price": price,
            "percent_change": percent_change,
            "volume": volume,
            "market_cap": market_cap,
            "fifty_week_high": fifty_week_high,
            "fifty_week_low": fifty_week_low,
            "time": formatted_time,
            "time_graph": time_graph,
            "company_news": company_news
            # "watchers": [watcher.to_dict() for watcher in portfolio_watchers]
            # "likes": [like.to_dict() for like in self.likes],
        }
    def to_dict_basic(self):
        return{
            "ticker": self.ticker
        }
