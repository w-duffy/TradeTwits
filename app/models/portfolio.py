from .db import db
import os
import finnhub
import requests

class Portfolio(db.Model):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="portfolio")


    def to_dict(self):

        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

            p = finnhub_client.quote(self.ticker.upper())
            data = finnhub_client.symbol_lookup(self.ticker.upper())
            company_name_upper = data['result'][0]['description']
            company_name_lower = company_name_upper.lower()
            company_name = company_name_lower.title()
            low = p["l"]
            p_change = p['dp']
            p_close = p['pc']
            current = p['c']
            high = p['h']
            open = p['o']

        except:
            try:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                low = p["l"]
                p_change = p['dp']
                p_close = p['pc']
                current = p['c']
                high = p['h']
                open = p['o']

            except:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                low = p["l"]
                p_change = p['dp']
                p_close = p['pc']
                current = p['c']
                high = p['h']
                open = p['o']

        return {
            "id": self.id,
            "user_id": self.user_id,
            "ticker": self.ticker,
            "company_name": company_name,
            "p_close": p_close,
            "low": low,
            "p_change": p_change,
            "current": current,
            "high": high,
            "open": open
        }
