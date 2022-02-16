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
        user_id=1, comment="Great post", stock_discussion_id=1, time_created=today, time_updated=today)

    user_comment2 = Comment(
        user_id=1, comment="Nice insight", stock_discussion_id=1, time_created=day_before, time_updated=day_before)

    user_comment3 = Comment(
        user_id=2, comment="Awesome!!", stock_discussion_id=1, time_created=day_before, time_updated=day_before2)

    user_comment4 = Comment(
        user_id=3, comment="Sweet Stocks", stock_discussion_id=1, time_created=today, time_updated=day_before3)


    db.session.add(user_comment1)
    db.session.add(user_comment2)
    db.session.add(user_comment3)
    db.session.add(user_comment4)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
