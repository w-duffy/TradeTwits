from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio="This is my bio", profile_picture="https://financialtribune.com/sites/default/files/styles/360x260/public/field/image/17january/warren_buffett.png?itok=YGYUtu3A")
    will = User(
        username='will', email='will@aa.io', password='password', bio="This is my bio", profile_picture="https://i.ibb.co/hs9s0dX/T03-GU501-J-U026-FTGTV4-Z-fe9950702ece-512-1.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', bio="This is my bio", profile_picture="https://w7.pngwing.com/pngs/906/222/png-transparent-computer-icons-user-profile-avatar-french-people-computer-network-heroes-black.png")


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
