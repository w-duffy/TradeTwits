from .db import db
import os
import finnhub

class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticker = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="watchlist")



    def to_dict(self):

        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

            p = finnhub_client.quote(self.ticker.upper())
            data = finnhub_client.symbol_lookup(self.ticker.upper())
            company_name_upper = data['result'][0]['description']
            company_name_lower = company_name_upper.lower()
            company_name = company_name_lower.title()
            price = p["l"]
            percent_change = p['dp']

        except:
            try:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                price = p["l"]
                percent_change = p['dp']
            except:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                price = p["l"]
                percent_change = p['dp']


        return {
            "id": self.id,
            "user_id": self.user_id,
            "ticker": self.ticker,
            "price": price,
            "percent_change": percent_change,
            "company_name": company_name
        }
