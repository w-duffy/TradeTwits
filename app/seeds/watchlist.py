from app.models import db, Watchlist


def seed_watchlists():

    watchlist1 = Watchlist(
        user_id=1, ticker="AAPL")

    watchlist2 = Watchlist(
    user_id=1, ticker="XOM")

    db.session.add(watchlist1)
    db.session.add(watchlist2)

    db.session.commit()

def undo_watchlists():
    db.session.execute('TRUNCATE stockDiscussions RESTART IDENTITY CASCADE;')
    db.session.commit()
