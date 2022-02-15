from app.models import db, Portfolio

def seed_portfolios():

    user_portfolio1 = Portfolio(
        user_id=1, ticker="AAPL", name="First")

    user_portfolio2 = Portfolio(
        user_id=1, ticker="MSFT", name="First")

    user_portfolio3 = Portfolio(
        user_id=1, ticker="MTDR", name="First")

    user_portfolio4 = Portfolio(
        user_id=1, ticker="PYPL", name="First")


    db.session.add(user_portfolio1)
    db.session.add(user_portfolio2)
    db.session.add(user_portfolio3)
    db.session.add(user_portfolio4)

    db.session.commit()

def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
