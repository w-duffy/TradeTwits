# TradeTwits
[TradeTwits](http://tradetwits.herokuapp.com/), a full-stack application is an online platform for users to discuss stocks and see real time stock data.

Visit our [wiki](https://github.com/w-duffy/TradeTwits/wiki) for more information.

#Get Started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/w-duffy/TradeTwits
   ```

2. Install Backend dependencies inside the python-project-starter directory

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt     
      ```
3. Install Frontend dependencies inside the react-app directory

     ```npm install```


4. Create a .env file base on the .env.example given in the root directory BEWARE the API keys needed are from Finnhub-python and Rapid-API

5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Migrate and Seed models into the DB

     ```pipenv run flask db upgrade```
     ```pipenv run flask seed all```

7. You can start the front end from the react-app directory by:

     ```npm start```

8. You can start the backend from the python-project-starter by:

     ```pipenv run flask run```
     
## Features
 - Account Registration and Sign-In

 - Portfolio/Watchlist
    -Logged in users can create portfolios.
    -Logged in users can view the stocks in their portfolio.
    -Users can delete their portfolios.

 - Comments
   - Users can post comments under memes.
   - Users can edit their own comments.
   - Users can delete their own comments.
 - Like
   - Users can like memes that they find on their feeds.
   - Users can remove their previous likes.

 <img src="./public/images/documentation/like-and-comment.gif" height=500 alt="Like and comment on memes">

 - Follow and Feed
   - Users can follow other users and curate their own feed.
   - Users can view a feed of memes that can be sorted by most likes, most recent, or most engagement.
   - Users can post memes to their own personal pages.

