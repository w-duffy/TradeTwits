from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio="Demo, born February 24, 2022, is an American business magnate, investor, and philanthropist. He is currently the chairman and CEO of Herkshire Bathaway. He is considered one of the most successful investors in the world and has a net worth of over $114 billion as of February 2022, making him the world's eighth-wealthiest person.", profile_picture="https://financialtribune.com/sites/default/files/styles/360x260/public/field/image/17january/warren_buffett.png?itok=YGYUtu3A")
    will = User(
        username='Will', email='will@aa.io', password='password', bio="Will Duffy is a full-stack software engineer, and founder of TradeTwits", profile_picture="https://i.ibb.co/hs9s0dX/T03-GU501-J-U026-FTGTV4-Z-fe9950702ece-512-1.jpg")
    bobbie = User(
        username='Cathie', email='bobbie@aa.io', password='password', bio="Investor / Entrepreneur", profile_picture="https://global-uploads.webflow.com/5a6230126f4292000144217a/605353ce68578f1e765a3a14_5eb9f87c980da9714b893fd0_catherine-wood.jpeg")


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
