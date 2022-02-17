from app.models import db, Portfolio

def seed_portfolios():

    user_portfolio1 = Portfolio(
        user_id=1, ticker="AAPL")

    db.session.add(user_portfolio1)

    db.session.commit()

def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
