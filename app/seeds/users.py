from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_picture="")
    will = User(
        username='will', email='will@aa.io', password='password', profile_picture="https://i.ibb.co/hs9s0dX/T03-GU501-J-U026-FTGTV4-Z-fe9950702ece-512-1.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_picture="")


    db.session.add(demo)
    db.session.add(will)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
