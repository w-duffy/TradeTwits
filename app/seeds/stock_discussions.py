from app.models import db, StockDiscussion


def seed_stock_discussions():

    stock_discussion1 = StockDiscussion(
        name="Apple", ticker="AAPL")

    stock_discussion2 = StockDiscussion(
    name="Exxon", ticker="XOM")

    db.session.add(stock_discussion1)
    db.session.add(stock_discussion2)

    db.session.commit()

def undo_stock_discussions():
    db.session.execute('TRUNCATE stockDiscussions RESTART IDENTITY CASCADE;')
    db.session.commit()
