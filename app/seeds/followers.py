from app.models import db, Follower


def seed_followers():

    user_f1 = Follower(
        user_id=1, follower_id=2)

    user_f2 = Follower(
        user_id=1, follower_id=3)

    user_f3 = Follower(
        user_id=2, follower_id=2)

    user_f4 = Follower(
        user_id=3, follower_id=2)

    db.session.add(user_f1)
    db.session.add(user_f2)
    db.session.add(user_f3)
    db.session.add(user_f4)


    db.session.commit()

def undo_followers():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
