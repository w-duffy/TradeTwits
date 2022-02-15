from app.models import db, Like


def seed_likes():

    user_like1 = Like(
        user_id=3, comment_id=1)

    user_like2 = Like(
        user_id=2, comment_id=1)

    user_like3 = Like(
        user_id=1, comment_id=2)

    user_like4 = Like(
        user_id=1, comment_id=3)

    db.session.add(user_like1)
    db.session.add(user_like2)
    db.session.add(user_like3)
    db.session.add(user_like4)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
