from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .portfolios import seed_portfolios, undo_portfolios
from .stock_discussions import seed_stock_discussions, undo_stock_discussions
from .followers import seed_followers, undo_followers
# from .watchlist import seed_watchlists, undo_watchlists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_portfolios()
    seed_stock_discussions()
    seed_comments()
    seed_likes()
    seed_followers()
    # seed_watchlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_portfolios()
    undo_stock_discussions()
    undo_comments()
    undo_likes()
    undo_followers()
    # undo_watchlists()
    # Add other undo functions here
