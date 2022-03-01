from app.models import db, Comment
from datetime import datetime, timedelta

def seed_comments():

    today = datetime.now()
    day_before = today - timedelta(days = 1)
    day_before2 = today - timedelta(days = 2)
    day_before3 = today - timedelta(days = 3)
    # day_before4 = today - timedelta(days = 4)
    # day_before5 = today - timedelta(days = 5)

    user_comment1 = Comment(
        user_id=1, comment="Its devices and services continue to be a primary solution for entertainment and productivity tasks. BofA expects this trend to grow as more products/services launch.", stock_discussion_id=1, time_created=today, time_updated=today)

    user_comment2 = Comment(
        user_id=2, comment="Analysts make comments on AAPL to cause short squeezes after a dip. Then they'll come back on after a squeeze and tell you to buy the dip causing a rally.", stock_discussion_id=1, time_created=day_before, time_updated=day_before)

    user_comment3 = Comment(
        user_id=1, comment="Herkshire Bathaway AAPL holdings increase today!", stock_discussion_id=1, time_created=day_before, time_updated=day_before2)

    user_comment4 = Comment(
        user_id=3, comment="An apple a day keeps the doctor away..", stock_discussion_id=1, time_created=today, time_updated=day_before3)

    user_comment5 = Comment(
    user_id=1, comment="8-10% of its revenues come from video gaming directly, with Xbox being one of the largest brands. Strong secular tailwinds for the gaming space. The potential merger with Activision Blizzard would add ~$9B of gaming revenue for Microsoft.", stock_discussion_id=2, time_created=today, time_updated=today)

    user_comment6 = Comment(
        user_id=2, comment="It's currently above calculated price at 292.83 but below current price pivot at 299.87...so in no mans land.", stock_discussion_id=2, time_created=day_before, time_updated=day_before)

    user_comment7 = Comment(
        user_id=1, comment="Big test here for Microsoft at the 200 dma and trendline...", stock_discussion_id=2, time_created=day_before, time_updated=day_before2)

    user_comment8 = Comment(
        user_id=3, comment="Sold all of my tech stocks except for MSFT", stock_discussion_id=2, time_created=today, time_updated=day_before3)


    db.session.add(user_comment1)
    db.session.add(user_comment2)
    db.session.add(user_comment3)
    db.session.add(user_comment4)
    db.session.add(user_comment5)
    db.session.add(user_comment6)
    db.session.add(user_comment7)
    db.session.add(user_comment8)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
