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

    user_like5= Like(
    user_id=1, comment_id=6)

    user_like6 = Like(
    user_id=2, comment_id=5)

    user_like7 = Like(
    user_id=1, comment_id=5)

    user_like8 = Like(
    user_id=1, reply_id=1)

    user_like9 = Like(
    user_id=2, reply_id=1)

    user_like10 = Like(
    user_id=3, reply_id=1)

    user_like11 = Like(
    user_id=2,  reply_id=2)

    user_like12 = Like(
    user_id=3, reply_id=5)

    user_like13 = Like(
    user_id=3, comment_id=3)

    user_like14 = Like(
    user_id=2, comment_id=3)

    db.session.add(user_like1)
    db.session.add(user_like2)
    db.session.add(user_like3)
    db.session.add(user_like4)
    db.session.add(user_like5)
    db.session.add(user_like6)
    db.session.add(user_like7)
    db.session.add(user_like8)
    db.session.add(user_like9)
    db.session.add(user_like10)
    db.session.add(user_like11)
    db.session.add(user_like12)
    db.session.add(user_like13)
    db.session.add(user_like14)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
