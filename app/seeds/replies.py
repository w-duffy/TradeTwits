from app.models import db, Reply
from datetime import datetime, timedelta

def seed_replies():

    today = datetime.now()
    day_before = today - timedelta(days = 1)
    day_before2 = today - timedelta(days = 2)
    day_before3 = today - timedelta(days = 3)
    # day_before4 = today - timedelta(days = 4)
    # day_before5 = today - timedelta(days = 5)

    user_reply1 = Reply(
        user_id=1, comment_id=1, reply="Great post!", time_created=today, time_updated=today)

    user_reply2 = Reply(
        user_id=1, comment_id=2, reply="I like your thought", time_created=day_before, time_updated=day_before)

    user_reply3 = Reply(
        user_id=3, comment_id=1, reply="I think you're onto something.", time_created=day_before2, time_updated=day_before2)

    user_reply4 = Reply(
        user_id=2, comment_id=1, reply="Nice post!", time_created=day_before3, time_updated=day_before3)

    user_reply5= Reply(
        user_id=1, comment_id=3, reply="Nice post.  I like it!!", time_created=today, time_updated=today)


    db.session.add(user_reply1)
    db.session.add(user_reply2)
    db.session.add(user_reply3)
    db.session.add(user_reply4)
    db.session.add(user_reply5)

    db.session.commit()

def undo_replies():
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()
